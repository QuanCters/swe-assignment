"use strict";

const historyService = require('../services/history.service');

const findAllHistories = async (req, res) => {
    const histories = await historyService.findAllHistories();
    res.json(histories);
}

const findHistoryByUserId = async (req, res) => {
    const { userId } = req.params;
    const histories = await historyService.findHistoryByUserId(userId);
    res.json(histories);
}

module.exports = {
    findAllHistories,
    findHistoryByUserId,
}
