// const { Question } = require("../models/Question")

// module.exports = {
//   index: (req, res) => {
//     Question.find({})
//       .populate('author')
//       .then(questions => {
//         res.render('app/index', {questions})
//       })
//     // res.send('Hello')
//   }
// }

const { Question } = require('../models/Question')

module.exports = {
  index: (req, res) => {
    Question.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('author')
      .then(q => {
        res.render('app/index', { q })
      })
  }
}