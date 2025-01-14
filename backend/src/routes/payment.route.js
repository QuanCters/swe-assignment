"use strict";

const { authentication } = require("../auth/authUtils");
const { apiKey, permission } = require("../auth/checkAuth");
const paymentCtrl = require("../controllers/payment.controller");
const router = require("express").Router();

// router.use(authentication);

router.post("/", paymentCtrl.payment);

router.post("/callback", paymentCtrl.callback);

router.post("/status", paymentCtrl.transactionStatus);

router.use(apiKey);
router.use(permission("1111"));

module.exports = router;
