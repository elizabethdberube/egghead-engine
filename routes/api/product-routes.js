const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

//get all products
router.get('/', (req, res) => {

  try {
    Product.findAll(req.params.id, {

      include: [{ model: Category }, { model: Tag }]
    }).then((productData) => {

      res.status(200).json(productData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get product by id
router.get('/:id', (req, res) => {

  try {
    Product.findByPk(req.params.id, {

      include: [{ model: Category }, { model: Tag }]
    }).then((productData) => {

      if (!productData) {
        res.status(404).json({ message: 'No product with that id!' });
        return;
      }
      else {
        res.status(200).json(productData);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', (req, res) => {

  Product.create(req.body)
    .then((productTagIds) => {

      if (req.body.productTagIds) {
        const productTagIdArr = req.body.productTagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }

      res.status(200).json(productTagIds);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update by id
router.put('/:id', (req, res) => {

  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {

      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {

      const productTagIds = productTags.map(({ tag_id }) => tag_id);

      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);


      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {

      res.status(400).json(err);
    });
});

// delete product by id
router.delete('/:id', (req, res) => {

  try {
    Product.destroy({
      where: {
        id: req.params.id
      }
    }).then((productData) => {

      if (!productData) {
        res.status(404).json({ message: 'There was a problem deleting your item' });
        return;
      }
      res.status(200).json(productData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
