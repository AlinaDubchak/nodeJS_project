const { Schema, model } = require('mongoose')

const schemaUser = new Schema({
  username: {
    type: String,
    required: true
  },
  passwd: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        courseId: {
          type: Schema.Types.ObjectId,
          ref: 'Course',
          required: true
        },
        count: {
          type: Number,
          required: true
        }
      }
    ]
  }
})

module.exports = model('User', schemaUser)
