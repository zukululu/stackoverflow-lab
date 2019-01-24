const express = require("express");
const router = express.Router();
const questionController = require("../controllers/question");

router.post("/", questionController.requireAuth, questionController.create);
router.get("/new", questionController.requireAuth, questionController.new);
router.get("/:id", questionController.show);
router.put("/:id", questionController.requireAuth, questionController.update);

module.exports = router;
