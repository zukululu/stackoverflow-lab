const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const User = new Schema ({
  email: String,
  password: String,
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question"
    }
  ]
})

module.exports = mongoose.model("User", User)