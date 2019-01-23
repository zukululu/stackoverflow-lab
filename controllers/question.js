const { Question, Answer } = require("../models/Question");
const User = require("../models/User");

module.exports = {
  show: (req, res) => {
    Question.findOne({ _id: req.params.id })
      .populate("author")
      .then(question => {
        Answer.populate(question.answers, { path: "author" }).then(answers => {
          question.answers = answers;
          res.render("question/show", question);
        });
      })
  },
  new: (req, res) => {
    User.find({}).then(users => {
      res.render("question/new", { users });
    });
  },
  create: (req, res) => 
  {
    User.create(
    {
      email: req.params.email,
      password: req.params.password
    }).then((newUser) => 
    {
      Question.create(
      {
        content: req.params.content,
        author: newUser.email
      }).then(newQuestion => 
        {
        newUser.questions.push(newQuestion)
        })
    }).catch(err => {
      console.error(err)
    })
  },


  //   Question.create({
  //     content: req.body.question.content,
  //     author: req.body.author
  //   }).then(question => {
  //     User.findOne({ email: req.body.author }).then(user => {
  //       user.questions.push(question);
  //       user.save(err => {
  //         return res.redirect(`/question/${question._id}`);
  //       });
  //     });
  //   }).catch(err => {
  //     console.error(err)
  //   })


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
