const express = require("express");
const router = express.Router();
const metricsService = require("../services/metrics");
const passport = require("passport");

router.get("/metrics", metricsService.metricsService);


module.exports = router;