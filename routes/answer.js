const express = require("express");
const router = express.Router();
const answerController = require("../controllers/question");

router.post("/question/:id", answerController.create)
router.get("/question/:id", answerController.show)
router.put("/question/:id", answerController.update)

module.exports = router;