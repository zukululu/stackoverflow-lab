const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tweeter");
mongoose.Promise = Promise;
module.exports = mongoose