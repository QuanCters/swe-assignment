"use strict"

const historyRepo = require('../repositories/history.repository');

const findAllHistories = async () => {
    return await historyRepo.findAllHistories();
}

const saveHistory = async (history) => {
    return await historyRepo.saveHistory(history);
}

module.exports = {
    findAllHistories,
    saveHistory,
}