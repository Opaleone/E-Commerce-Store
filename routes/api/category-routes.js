const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const catData = await Category.findAll({
    include: [
      {model: Product}
    ]
    })

    if (!catData[0]) {
      return res.status(404).json({message: 'No categories found!'})
    }

    res.status(200).json(catData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCat = await Category.findByPk(req.params.id, {
      include: [
        {model: Product}
      ]
    })

    if (!singleCat) {
      return res.status(404).json({message: `No category found with that ID`})
    }

    res.status(200).json(singleCat)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category

  /* req.body should look like this
    {
      "category_name": "electronics"
    }
  */

  try {
    const newCat = await Category.create({
      id: req.body.id,
      category_name: req.body.category_name,
    })

    res.status(201).json(newCat)
  } catch (err) {
    res.status(500).json(err)
  }


});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const catUpdate = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if(!catUpdate[0]) {
      return res.status(404).json({message: 'No data found'})
    }

    res.status(200).json(catUpdate)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catDestroy = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({message: `${req.params.id} deleted successfully!`})
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
