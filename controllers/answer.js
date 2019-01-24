const { Question, Answer } = require("../models/Question");
const User = require("../models/User");
const bodyParser = require("body-parser");

module.exports = {
  // show: (req, res) => {},
  // showing the answers is being handled within question.js
  new: (req, res) => {
    Question.find({}).then(q => {
      res.render("question/new", { q });
    });
  },
  create: (req, res) => {
    Answer.create({
      content: req.body.content,
      author: req.body.author
    }).then(a => {
      Question.findOne({ _id: req.params.id }).then(user => {
        console.log(req.params.id)
        user.answers.push(a);
        // Don't think we need the res.redirect, but there it is
    });
});
// Why is our redirect now working? After submit, the the page is going to /answer, when it should stay on /question/:id
res.redirect(`/question/${question._id}`);
  },
  update: (req, res) => {}
  // delete: (req, res) => {}
  // do we need delete?
};
