const express = require("express");
const router = express.Router();
const requestController = require("../controller/request_controller");
const passport = require("passport");

router.post("/enqueue",passport.authenticate("jwt", {session: false}), requestController.enqueueRequest);


module.exports = router;