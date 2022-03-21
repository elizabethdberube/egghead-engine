const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');



// get all categories
router.get('/', (req, res) => {
  try {
    Category.findAll().then((categoryData) => {
      res.status(200).json(categoryData);
      console.log(categoryData)
    });

  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

// get category bu id
router.get('/:id', (req, res) => {
  try {
    Category.findByPk(req.params.id, {

      include: [{ model: Product }]
    }).then((categoryData) => {

      if (!categoryData) {
        res.status(404).json({ message: 'No category with that id!' });
        return;
      }
      else {
        res.status(200).json(categoryData);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category 
router.post('/', (req, res) => {
  Product.create(req.body)

  try {
    Category.create(req.body);
    res.status(200).json({ message: 'Category has been created!' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// update by id
router.put('/:id', (req, res) => {
  try {

    Category.update(req.body,
      {
        where: {
          id: req.params.id,
        },

      }).then((categoryData) => {
        if (!categoryData) {
          res.status(404).json({ message: 'No category with that id!' });
          return;
        }
        else {
          res.status(200).json({ message: 'Category has been updated!' });

        }
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete category by id
router.delete('/:id', (req, res) => {
  try {
    Category.destroy({
      where: {
        id: req.params.id
      }
    }).then((categoryData) => {

      if (!categoryData) {
        res.status(404).json({ message: 'There was a problem deleting your item' });
        return;
      }
      res.status(200).json({ message: 'Item has been deleted!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
