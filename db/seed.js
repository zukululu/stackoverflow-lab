const User = require("../models/User");
const { Question } = require("../models/Question");
const bcrypt = require("bcrypt-nodejs")

User.find({}).remove(() => {
    Question.find({}).remove(() => {
      let bugs = User.create({
          email: "bugsbunny@gmail.com",
          password: createPassword("bugsbunny")
      }).then(user => {
        Promise.all([
          Question.create({
            content: "eh, what's up doc?",
            author: user._id
          }).then(question => {
            user.questions.push(question);
          }),
          Question.create({
            content: "That's all, folks!",
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
          password: createPassword("daffyduck")
      }).then(user => {
        Promise.all([
          Question.create({
            content: "Who's this Duck Dodgers any how?",
            author: user._id
          }).then(question => {
            user.questions.push(question);
          }),
          Question.create({
            content: "You're dethpicable.",
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
          password: createPassword("elmerfudd")
      }).then(user => {
        Promise.all([
          Question.create({
            content:
              "Shh. Be vewy vewy quiet. I'm hunting wabbits! Huh-huh-huh-huh!",
            author: user._id
          }).then(question => {
            user.questions.push(question);
          }),
  
          Question.create({
            content: "Kiww da wabbit!",
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
  