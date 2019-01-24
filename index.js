const express = require("express");
const hbs = require("hbs");
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");
const session = require('express-session')
const passport = require('passport')
const methodOverride = require("method-override");
const app = express();
const routes = require("./routes/index.js");
const flash = require('connect-flash')
const userController = require('./controllers/user')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/", routes);
app.set("view engine", "hbs");
app.use(methodOverride("_method"));

app.use(require("./routes/index.js"));


app.use(cookieParser())
app.use(bodyParser())

app.set('view engine', 'hbs')
// // app.use(express.static(__dirname + '/public'))

app.use(session({secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS'}))
app.use(flash())

// require('./config/passport')(passport)
// app.use(passport.initialize())
// app.use(passport.session())

// app.use(function(req, res, next) {
//   res.locals.currentUser = req.user
//   next()
// })

// // app.use('/', userController)

// app.set('port', process.env.PORT || 7777)

// app.listen(app.get('port'), () => console.log(`locked and loaded on ${app.get('port')}`))

app.listen(3000, () => {
  console.log("server is running");
});
