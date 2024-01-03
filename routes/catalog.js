const { Router } = require('express')
const router = Router()
const Course = require('../models/courses')
const notAuth = require('../middleware/notAuth')

router.get('/', notAuth, async (req, res) => {
  try {
    const courses = await Course.find().populate('userId')
    // console.log(courses)
    res.render('catalog', {
      title: 'Catalog',
      courses
    })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
