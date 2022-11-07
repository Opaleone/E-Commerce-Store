const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
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
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product
      }
      ]
    })

    if (!singleTag) {
      return res.status(404).json({message: "No tag found with that ID"})
    }

    res.status(200).json(singleTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {

  /* req.body should look like this...
    {
      "tag_name": "1TB"
    }
  */

  try {
    const newTag = await Tag.create({
      id: req.body.id,
      tag_name: req.body.tag_name,
    })

    if (!newTag) {
      return res.status(404).json({message: 'No tag data found!'})
    }

    res.status(201).json(newTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagUpdate = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if (!tagUpdate) {
      return res.status(404).json({message: 'No tag data found!'})
    }

    res.status(200).json(tagUpdate)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagDestroy = await Tag.destroy({
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
