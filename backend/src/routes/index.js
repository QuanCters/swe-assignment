"use strict";

const express = require("express");
const router = express.Router();
// const { apiKey, permission } = require("../auth/checkAuth");

// router.use(apiKey);
// router.use(permission("1111"));

router.use("/v1/api/printer", require("./printer.route"));
router.use("/v1/api/student", require("./student.route"));
router.use("/v1/api/user", require("./auth.route"));

module.exports = router;
