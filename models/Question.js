const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const Answer = new Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Question = new Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  answers: [Answer]
});

module.exports = {
  Question: mongoose.model("Question", Question),
  Answer: mongoose.model("Answer", Answer)
};
