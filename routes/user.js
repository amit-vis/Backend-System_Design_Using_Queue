const express = require("express");
const router = express.Router();
const userController = require("../controller/user_controllere");

router.post("/create", userController.register);
router.post("/login", userController.login);

module.exports = router;