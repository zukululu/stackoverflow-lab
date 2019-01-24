const express = require("express");
const router = express.Router();
const questionController = require("../controllers/question");
const answerController = require('../controllers/answer')

router.post("/", questionController.create);
router.post("/new", questionController.create);

router.get("/new", questionController.new);
router.get("/:id", questionController.show);
router.put("/:id", questionController.update);

module.exports = router;
