const Course = require('../models/courses')
module.exports = async function (req, res, next) {
  const courseId = req.params.id || req.body.courseId
  const currUserId = req.user._id.toString()
  const selectedCourse = await Course.findById(courseId).populate('userId')
  const ownerCourseId = selectedCourse.userId._id.toString()
  if (currUserId !== ownerCourseId) {
    req.flash('postError', 'You are not the owner of the course!')
    return res.redirect('/myposts')
  }
  next()
}
