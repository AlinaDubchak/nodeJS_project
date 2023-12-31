const { Router } = require('express')
const router = Router()
const notAuth = require('../middleware/notAuth')
const Course = require('../models/courses')
const editConfig = require('../middleware/edit')

router.get('/', notAuth, async (req, res) => {
  try {
    const courses = await Course.find({ userId: req.user._id }).populate(
      'userId'
    )
    res.render('post_page', {
      title: 'My posts',
      postCreated: req.flash('postCreated'),
      postEdited: req.flash('postEdited'),
      postError: req.flash('postError'),
      courses
    })
  } catch (e) {
    console.log(e)
  }
})

router.get('/add', notAuth, (req, res) => {
  const userId = req.user._id
  res.render('add_post', {
    title: 'Add post',
    userId,
    postError: req.flash('postError')
  })
})

router.post('/add', notAuth, async (req, res) => {
  try {
    const { title, price, img, userId } = req.body
    const candidate = await Course.findOne({ title })
    if (candidate) {
      req.flash('postError', 'Course with this title already exist!')
      res.redirect('/myposts/add')
    } else {
      const newCourse = new Course({
        title,
        price,
        img,
        userId
      })
      await newCourse.save()
      req.flash('postCreated', 'Course successfully added!')
      res.redirect('/myposts')
    }
  } catch (e) {
    console.log(e)
  }
})

router.get('/:id', notAuth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    res.render('course_page', {
      title: course.title,
      course
    })
  } catch (e) {
    console.log(e)
  }
})

router.get('/:id/edit', [notAuth, editConfig], async (req, res) => {
  try {
    const courseId = req.params.id
    const course = await Course.findById(courseId).populate('userId')
    res.render('edit_post', {
      title: course.title,
      course,
      id: courseId
    })
  } catch (e) {
    console.log(e)
  }
})

router.post('/edit', [notAuth, editConfig], async (req, res) => {
  try {
    const { courseId } = req.body
    delete req.body.courseId
    await Course.findByIdAndUpdate(courseId, req.body)
    req.flash('postEdited', 'Course successfully edited!')
    res.redirect('/myposts')
  } catch (e) {
    console.log(e)
  }
})

router.post('/delete', [notAuth, editConfig], async (req, res) => {
  try {
    const { courseId } = req.body
    delete req.body.courseId
    await Course.findByIdAndDelete(courseId, req.body)
    req.flash('postEdited', 'Course successfully deleted!')
    res.redirect('/myposts')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
