"use strict"

const { print } = require("../controllers/student.controller");

const express = require("express");
const router = express.Router();

router.post("/:userId/print/:printerId", print);

module.exports = router;