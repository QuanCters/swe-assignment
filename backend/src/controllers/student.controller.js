"use strict"

const { print: printService } = require("../services/printer.service");

const print = async (req, res) => {
    const { userId, printerId } = req.params;
    const { documentId, config } = req.body;
    const printInfo = { userId, printerId, documentId, config };
    const result = await printService({ printInfo });
    res.send(result);
};

module.exports = {
    print
}