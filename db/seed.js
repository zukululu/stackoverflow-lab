const User = require("../models/User");
const { Question, Answer } = require("../models/Question");
// const bcrypt = require("bcrypt-nodejs")

User.find({}).remove(() => {
    Question.find({}).remove(() => {
      Answer.find().remove(() => {
        console.log('everything is empty now')
      })
    });
  }).then(removed => {




    User.create({
      email: "whatever@what.com",
      password: "testpassword1234"
    }).then((newUser) => {
      Question.create({
        content: "what is the meaning of life?",
        author: newUser._id
      }).then(newQuestion => {
        Answer.create({
          content: "Here is our answer",
          author: "Bob"
        }).then((newAnswer => {
          newQuestion.answers.push(newAnswer)
          newUser.questions.push(newQuestion._id)
          console.log('done??!??')
          process.exit()
        })).catch(err => {
          console.error(err)
        })
      })
    })




    
  })


// first create user
// then
// create answer
// create question
// push answer into question.answers
// push question into user.questions