const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{
        model: Product,
    }]
    })

    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product
      }
      ]
    })

    res.status(200).json(singleTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      id: req.body.id,
      tag_name: req.body.tag_name,
    })

    if (!newTag[0]) {
      res.status(404).json({message: 'No tag data found!'})
      return
    }

    res.status(201).json(newTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagUpdate = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if (!tagUpdate) {
      res.status(404).json({message: 'No tag data found!'})
      return
    }

    res.status(200).json(tagUpdate)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDestroy = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({message: `${req.params.id} deleted successfully!`}, tagDestroy)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
