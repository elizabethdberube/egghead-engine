const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

// get all catagories
router.get('/', (req, res) => {
  try {
    Category.findAll().then((categoryData) => {
      res.status(200).json(categoryData);

    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// get catagory bu id
router.get('/:id', (req, res) => {
  try {
    Category.findByPk(req.params.id, {

      include: [{ model: Product, through: ProductTag }]
    }).then((categoryData) => {
      res.status(200).json(categoryData);
      if (!categoryData) {
        res.status(404).json({ message: 'No category with that id!' });
        return;
      }
      res.status(404).json(categoryData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new catagory 
router.post('/', (req, res) => {
  try {
    Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update by id
router.put('/:id', (req, res) => {
  try {
    Category.update(req.body,
      {
        where: {
          id: req.body.id,
        },
      }).then((categoryData) => {
        if (!categoryData[0]) {
          res.status(404).json({ message: 'No catagory with that id!' });
          return;
        }
        res.status(200).json(categoryData);
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete catagory 
router.delete('/:id', (req, res) => {
  try {
    Category.destroy({
      where: {
        id: req.params.id
      }
    }).then((categoryData) => {

      if (!categoryData) {
        res.status(404).json({ message: 'No catagonry with that id!' });
        return;
      }
      res.status(200).json(categoryData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
