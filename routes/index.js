const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/request", require("./request"));
router.use("/metrics", require("./metrics"))

module.exports = router;