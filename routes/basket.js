const { Router } = require('express')
const router = Router()
const notAuth = require('../middleware/notAuth')

router.get('/', notAuth, (req, res) => {
  res.render('basket', {
    title: 'Shop Page'
  })
})

module.exports = router
