const express = require("express");
const router = express.Router();

router.unsubscribe((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})

router.use("/", require("./application.js"));
router.use("/user", require("./user"));
router.use("/question", require("./question"));

router.all("*", (req, res) => {
  res.status(400).send();
});

module.exports = router;
