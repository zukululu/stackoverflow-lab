const { Question, Comment } = require("../models/question");
const User = require("../models/User");

module.exports = {
  show: (req, res) => {
    question.findOne({ _id: req.params.id })
      .populate("author")
      .then(question => {
        Answer.populate(question.answers, { path: "author" }).then(answers => {
          question.answers = answers;
          res.render("index", question);
        });
      })
  },
  new: (req, res) => {
    User.find({}).then(users => {
      res.render("question/new", { users });
    });
  },
  create: (req, res) => {
    question.create({
      content: req.body.question.content,
      author: req.body.author
    }).then(question => {
      User.findOne({ _id: req.body.author }).then(user => {
        user.questions.push(question);
        user.save(err => {
          res.redirect(`/question/${question._id}`);
        });
      });
    });
  },
  update: (req, res) => {
    let { content, author } = req.body;
    question.findOne({ _id: req.params.id }).then(question => {
      question.answers.push({
        content,
        author
      });
      question.save(err => {
        res.redirect(`/question/${question._id}`);
      });
    });
  }
};
