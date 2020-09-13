const { Router } = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/LInk')
const router = Router()
const auth = require('../middleware/middleware.auth')

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl') // server url
    const { from } = req.body // original uncoded link
    const code = shortid.generate()

    // trying to get a link from the database
    const existing = await Link.findOne({ from })

    if (existing) {
      return res.json({ link: existing })
    }

    const to = baseUrl + '/t/' + code // url of the shortened link
    const link = new Link({
      from, to, code, owner: req.user.userId
    })

    link.save()

    res.status(201).json({ link })

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Try again ...' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    // get userId from request object
    const links = await Link.find({ owner: req.user.userId })
    res.json(links)
  } catch (e) {
    res.status(500).json({ message: 'Get links. Something went wrong. Try again ...' })
  }

})

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Try again ...' })
  }
})


module.exports = router