const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const User = new Schema({
  email: String,
  password: String,
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question"
    }
  ]
});

User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", User);
