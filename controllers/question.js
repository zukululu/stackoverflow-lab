const { Question, Answer } = require("../models/Question");

module.exports = {
  show: (req, res) => {
    Question.findOne({_id: req.params.id})
      .populate('author comments.author')
      .exec(function(err, q) {
        res.render('question/show', q)
      })
  },
  new: (req, res) => {
    res.render('question/new')
  },
  create: (req, res) => {
    Question.create({
      content: req.body.question.content,
      author: req.user._id
    }).then(q => {
      req.user.questions.push(q)
      req.user.save(err => {
        res.redirect(`/question/${q._id}`)
      })
    })
  },
  update: (req, res) => {
    let { content } = req.body
    Question.findOne({ _id: req.params.id}).then(q => {
      q.answers.push({
        content,
        author: req.user._id
      })
      q.save(err => {
        res.redirect(`/question/${q._id}`)
      })
    })
  },
  requireAuth: function(req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/')
    }
  }
};
