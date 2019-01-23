const { Question, Answer } = require("../models/Question");
const User = require("../models/User");
const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
  show: (req, res) => {
    Question.findOne({ _id: req.params.id })
      .populate("author")
      .then(question => {
        Answer.populate(question.answers, { path: "author" }).then(answers => {
          question.answers = answers;
          res.render("question/show", question);
        });
      });
  },
  new: (req, res) => {
    User.find({}).then(users => {
      res.render("question/new", { users });
    });
  },
  create: (req, res) => {
      console.log(req.body)

    Question.create({
        content: req.body.content,
        author: req.body.author
    }).then(question => {
        User.findOne({ _id: question.author }).then(user => {
            user.questions.push(question)
            // .populate('questions')
            res.redirect(`/question/${question._id}`)
        });
    }).catch(err => {
        console.error(err)
    })
    
    
},

  update: (req, res) => {
    let { content, author } = req.body;
    Question.findOne({ _id: req.params.id }).then(question => {
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
