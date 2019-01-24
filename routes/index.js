const express = require("express");
const router = express.Router();

router.use("/", require("./application.js"));
router.use("/user", require("./user"));
router.use("/question", require("./question"));
router.use("/answer", require("./answer"));

router.all("*", (req, res) => {
  res.status(400).send();
});

module.exports = router;
