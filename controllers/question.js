const { Question, Answer } = require("../models/Question");
const User = require("../models/User");
const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
  show: (req, res) => {
    Question.findOne({ _id: req.params.id })
      .populate("author")
      .then(question => {
          // why does not having  path: 'author' break the code?...
        Answer.populate(question.answers, {  path: "author"}).then(answers => {
          question.answers = answers;
          res.render("question/show", question);
          res.render("question/show", question.answers);
        });
      });
  },
  new: (req, res) => {
    User.find({}).then(users => {
      res.render("question/new", { users });
    });
  },
  create: (req, res) => {
    // console.log(req.body);

    Question.create({
      content: req.body.content,
      author: req.body.author
    }).then(question => {
      User.findOne({ _id: question.author }).then(user => {
        user.questions.push(question);
        //   .then(() => {
        //     user.findOne({ _id: req.body.author }).populate('email');
        //   })
        //   .catch(err => {
        //     console.error(err);
        //   });
        res.redirect(`/question/${question._id}`);
      });
    });
    //   .then(() => {
    //     User.findOne({ id: req.body.author }).populate("author");
    //     return parsedAuthor;
    //   });
    //   .catch(err => {
    //     console.error(err);
    //   });
  },
  update: (req, res) => {
    //redirect user to new page
    res.redirect(`/questions/${question._id}/update`);
    //on new page, make text area value set to body content
    //on submit, set new content body

    // let { content, author } = req.body;
    // Question.findOne({ _id: req.params.id }).then(question => {
    //   question.answers.push({
    //     content,
    //     author
    //   });
    //   question.save(err => {
    //     res.redirect(`/question/${question._id}`);
    //   });
    // });
  }
};
