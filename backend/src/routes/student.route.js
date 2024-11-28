"use strict"

const { print, updateStudentPageBalance } = require("../controllers/student.controller");

const express = require("express");
const router = express.Router();

router.patch("/:userId", updateStudentPageBalance);
router.post("/:userId/print/:printerId", print);

module.exports = router;