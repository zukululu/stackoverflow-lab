const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/questionsapp");
mongoose.Promise = Promise;
module.exports = mongoose