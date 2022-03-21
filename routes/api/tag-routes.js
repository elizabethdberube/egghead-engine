const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// get all tags
router.get('/', (req, res) => {

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

// get tag by id
router.get('/:id', (req, res) => {

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

// create a new tag
router.post('/', (req, res) => {

  Tag.create(req.body)
    .then((tagIds) => {

      if (req.body.tagIds) {
        const TagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(TagIdArr);
      }
      res.status(200).json(tagIds);
    })
    .then((tagIds) => res.status(200).json(tagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update by id
router.put('/:id', (req, res) => {

  try {
    Tag.update(req.body,
      {
        where: {
          id: req.params.id,
        },
      }).then((tagData) => {
        if (!tagData) {
          res.status(404).json({ message: 'No tag with that id!' });
          return;
        }
        else {
          res.status(200).json({ message: 'Tag has been updated!' });
        }
      })
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a tag by id
router.delete('/:id', (req, res) => {

  try {
    Tag.destroy({
      where: {
        id: req.params.id
      }
    }).then((tagData) => {

      if (!tagData) {
        res.status(404).json({ message: 'There was a problem deleting your item' });
        return;
      }
      res.status(200).json({ message: 'Tag has been deleted' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
