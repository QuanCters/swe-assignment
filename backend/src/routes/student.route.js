"use strict";

const { print } = require("../controllers/student.controller");

const express = require("express");
const router = express.Router();
const { authentication } = require("../auth/authUtils");

router.use(authentication);
router.post("/:userId/print/:printerId", print);

module.exports = router;
