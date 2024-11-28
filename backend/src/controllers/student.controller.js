"use strict"

const { print: printService } = require("../services/printer.service");
const { buyPages: buyPagesService } = require("../services/payment.service");
const { updateStudentPageBalance: updateStudentPageBalanceRepo } = require("../repositories/user.repository");

const print = async (req, res) => {
    const { userId, printerId } = req.params;
    const { documentId, config } = req.body;
    const printInfo = { userId, printerId, documentId, config };
    const result = await printService({ printInfo });
    res.send(result);
};

const updateStudentPageBalance = async (req, res) => {
    const id = req.params.userId;
    const { pageBalance } = req.body;
    const result = await updateStudentPageBalanceRepo({ id, pageBalance });
    res.send(result);
}

const buyPages = async (req, res) => {
    const userId = req.params.userId;
    const { pageCount } = req.body;
    const result = await buyPagesService({ userId, pageCount });
    res.send(result);
}

module.exports = {
    print,
    updateStudentPageBalance,
    buyPages,
}