const User = require("../models/User");
const { Question } = require("../models/Question");
// const bcrypt = require("bcrypt-nodejs")

User.find({}).remove(() => {
    Question.find({}).remove(() => {
      let bugs = User.create({
          email: "bugsbgtunny@gmail.com",
      }).then(user => {
        Promise.all([
          Question.create({
            content: "How old are you?",
            author: user._id,
            answers: [
              {
                content: 'I am 76',
                createdAt: {
                  type: Date,
                  default: Date.now()
                },
                author: {
                  type: Schema.Types.ObjectId,
                  ref: "User"
                }
              }
            ]
          }).then(question => {
            user.questions.push(question);
          }),
          Question.create({
            content: "'404 error on motherboard startup",
            author: user._id
          }).then(question => {
            user.questions.push(question);
          })
        ]).then(() => {
          user.save(err => console.log(err));
        });
      });
  
      let daffy = User.create({
          email: "daffyduck@gmail.com",
      }).then(user => {
        Promise.all([
          Question.create({
            content: "What's a for loop?",
            author: user._id
          }).then(question => {
            user.questions.push(question);
          }),
          Question.create({
            content: "why did I choose coding?",
            author: user._id
          }).then(question => {
            user.questions.push(question);
          })
        ]).then(() => {
          user.save(err => console.log(err));
        });
      });
  
      let elmer = User.create({
          email: "elmerfudd@gmail.com",
      }).then(user => {
        Promise.all([
          Question.create({
            content:
              "I dropped water into my harddrive, and now the mouse's DPI suffers. Help?",
            author: user._id
          }).then(question => {
            user.questions.push(question);
          }),
  
          Question.create({
            content: "What's Express and should I be worriedd?",
            author: user._id
          }).then(question => {
            user.questions.push(question);
          })
        ]).then(() => {
          user.save(err => console.log(err));
        });
      });
    });
  });
  