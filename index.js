const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
const routes = require('./routes/index.js')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use('/', routes)
app.set("view engine", "hbs");
app.use(methodOverride("_method"));


app.listen(3000, () => {
console.log("server is running")
});