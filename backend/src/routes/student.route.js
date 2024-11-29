"use strict";

const {
  print,
  buyPages,
  updateStudentPageBalance,
} = require("../controllers/student.controller");

const express = require("express");
const router = express.Router();
const { authentication } = require("../auth/authUtils");

router.use(authentication);
router.patch("/:userId/updatePages", updateStudentPageBalance);
router.patch("/:userId/buyPages", buyPages);
router.post("/:userId/print/:printerId", print);

module.exports = router;
