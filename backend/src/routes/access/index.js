"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/authUtils");
const AccessController = require("../../controllers/access.controller");
const router = express.Router();

// login for student
router.post("/user/login-student", asyncHandler(AccessController.loginStudent));

// login for SPSO
router.post("/user/login-spso", asyncHandler(AccessController.loginSPSO));

// authentication
router.use(authentication);

// logout for student
router.post(
  "/user/logout-student",
  asyncHandler(AccessController.logoutStudent)
);

// logout for SPSO
router.post("/user/logout-spso", asyncHandler(AccessController.logoutSPSO));

module.exports = router;
