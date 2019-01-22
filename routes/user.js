const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");

router.get("/new", userController.new);
router.get("/:id", userController.show);
router.post("/", userController.create);

module.exports = router;
