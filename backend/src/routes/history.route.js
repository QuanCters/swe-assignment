"use strict";

const historyCtrl = require('../controllers/history.controller');

const router = require('express').Router();

router.get('/', historyCtrl.findAllHistories);
router.get('/student/:userId', historyCtrl.findHistoryByUserId);

module.exports = router;