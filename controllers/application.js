const { Question } = require("../models/Question")

module.exports = {
  index: (req, res) => {
    Question.find({})
      .populate('author')
      .then(questions => {
        res.render('app/index', {questions})
      })
  }
}