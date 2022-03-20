const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

// get all catagories
router.get('/', (req, res) => {
  try {
    const catagoryData = await Category.findAll();
    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get catagory bu id
router.get('/:id', (req, res) => {
  try {
    const catagoryData = await Category.findByPk(req.params.id, {

      include: [{ model: Product, through: ProductTag }]
    });
    res.status(200).json(catagoryData);
    if (!catagoryData) {
      res.status(404).json({ message: 'No category with that id!' });
      return;
    }
    res.status(404).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new catagory 
router.post('/', (req, res) => {
  try {
    const catagoryData = await Category.create(req.body);
    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update by id
router.put('/:id', (req, res) => {
  try {
    const catagoryData = await Category.update(req.body,
      {
        where: {
          id: req.body.id,
        },
      });
    if (!catagoryData[0]) {
      res.status(404).json({ message: 'No catagory with that id!' });
      return;
    }
    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete catagory 
router.delete('/:id', (req, res) => {
  try {
    const catagoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!catagoryData) {
      res.status(404).json({ message: 'No catagonry with that id!' });
      return;
    }
    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
