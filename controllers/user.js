// const User = require("../models/User");
// const passport = require("passport");

// module.exports = {
//   show: (req, res) => {
//     User.findById(req.params.id).populate({
//       path: "questions",
//       options: { limit: 5, sort: { createdAt: -1 } }
//     });
//   },
//   new: (req, res) => {
//     res.render("user/new");
//   },
//   create: (req, res) => {
//     User.create({
//       email: req.body.email,
//       password: req.body.password
//     }).then(user => {
//       res.redirect(`user/${user._id}`);
//     });
//   }
// };


const User = require('../models/User')
// const { Question } = require('../models/Question')
const passport = require('passport')
// const flash = require('req-flash')

module.exports = {
  show: (req,res) => {
    User.findOne({ _id: req.params.id})
      .populate({
        path: 'questions',
        options: { limit: 5, sort: { createdAt: -1 } }
      }).then(u => {
        res.render('user/show', { u })
      })
  },
  login: (req,res) => {
    res.render('user/login', )
    // { message: req.flash('loginMessage') }
  },
  createLogin: (req,res) => {
    const login = passport.authenticate('local-login', {
      successRedirect: '/',
      failureRedirect: '/user/login',
      failureFlash: true
    })
    

    return login(req,res)
  },
  signUp: (req,res) => {
    res.render('user/signup', { message: req.flash('signupMessage') })
  },
  createSignUp: (req,res) => {
    const signup = passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/signup',
      failureFlash: true
    })

    return signup(req, res)
  },
  logout: (req,res) => {
    req.logout()
    res.redirect('/')
  }
}