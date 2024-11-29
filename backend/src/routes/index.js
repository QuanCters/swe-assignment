"use strict";

const express = require("express");
const router = express.Router();

router.use("/v1/api/printer", require("./printer.route"));
router.use("/v1/api/student", require("./student.route"));
router.use("/v1/api/user", require("./auth.route"));

module.exports = router;
