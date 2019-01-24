const LocalStrategy = require("passport-local");
const User = require("../models/user");

const passportConfig = function(passport) {
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, callback) {
        // search for user with email address
        User.findOne({ email: email }).then(user => {
          // if no user, flash message
          if (!user) {
            return callback(
              null,
              false,
              req.flash("loginMessage", "No user with that email")
            );
          }
          // if wrong password, flash message
          if (!user.validPassword(password)) {
            return callback(
              null,
              false,
              req.flash("loginMessage", "Password invalid")
            );
          }
          // if user is found, return success
          return callback(null, user);
        });
      }
    )
  );

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, callback) {
        User.findOne({ email: email })
          .then(user => {
            // if the user does exist return a message saying so
            if (user) {
              return callback(
                null,
                false,
                req.flash("signupMessage", "This email is already in use")
              );
            }
            // if the user doesn't exist create one
            let newUser = new User();
            newUser.email = email;
            newUser.password = newUser.hash(password);

            newUser.save(function(err) {
              if (err) {
                throw err;
              }
              return callback(null, newUser);
            });

            // else if theres an error handle it
          })
          .catch(err => {
            return callback(err);
          });
      }
    )
  );

  passport.serializeUser(function(user, callback) {
    callback(null, user._id);
  });

  passport.deserializeUser(function(id, callback) {
    User.findById(id)
      .then(user => {
        callback(null, user);
      })
      .catch(err => {
        callback(err);
      });
  });
};

module.exports = passportConfig;
