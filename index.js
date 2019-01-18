const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "hbs");
app.use(methodOverride("_method"));

// app.use(require("./routes/index.js"));

app.listen(3000, () => console.log("server is running"));