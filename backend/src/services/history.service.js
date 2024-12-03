"use strict"

const historyRepo = require('../repositories/history.repository');

const findAllHistories = async () => {
    return await historyRepo.findAllHistories();
}

const findHistoryByUserId = async (userId) => {
    return await historyRepo.findHistoryByUserId(userId);
}

const saveHistory = async (history) => {
    return await historyRepo.saveHistory(history);
}

module.exports = {
    findAllHistories,
    findHistoryByUserId,
    saveHistory,
}