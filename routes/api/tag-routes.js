const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    Tag.findAll(req.params.id, {

      include: [{ model: Product }]

    }).then((tagData) => {
      res.status(200).json(tagData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    Tag.findByPk(req.params.id, {

      include: [{ model: Product }]
    }).then((tagData) => {

      if (!tagData) {
        res.status(404).json({ message: 'No tag with that id!' });
        return;
      }
      else {
        res.status(200).json(tagData);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const TagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(TagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(tag);
    })
    .then((TagIds) => res.status(200).json(TagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    Tag.update(req.body,
      {
        where: {
          id: req.body.id,
        },
      }).then((tagData) => {
        if (!tagData[0]) {
          res.status(404).json({ message: 'No tag with that id!' });
          return;
        }
        res.status(200).json(tagData);
      })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    Category.destroy({
      where: {
        id: req.params.id
      }
    }).then((tagData) => {

      if (!catagoryData) {
        res.status(404).json({ message: 'No catagonry with that id!' });
        return;
      }
      res.status(200).json(catagoryData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
