"use strict"

const printerRepo = require('../repositories/printer.repository');
const { pay } = require('./payment.service');

const findAllPrinters = async () => {
    return await printerRepo.findAllPrinters();
}

const findPrinterById = async (id) => {
    return await printerRepo.findPrinterById(id);
}

const savePrinter = async (printer) => {
    return await printerRepo.savePrinter(printer);
}

const updatePrinter = async (printer) => {
    return await printerRepo.updatePrinter(printer);
}

const deletePrinter = async (id) => {
    return await printerRepo.deletePrinter(id);
}

const print = async ({ printInfo }) => {
    const { userId, printerId, documentId, config } = printInfo;
    const printer = findPrinterById(printerId);
    if (printer.status !== 'online') {
        throw new Error(`Printer ${printerId} is not online`);
    }
    const pageCount = documentId;
    const printCount = config.printCount;
    const pageType = config.pageType;
    const color = config.color;
    const duplex = config.duplex;
    const paymentAmount = pay({ paymentInfo: { userId, pageCount, config } });
    const result = `User ${userId} printed ${pageCount} pages on printer ${printerId} with ${color} color, ${pageType} page type, ${duplex ? 'duplex' : 'simplex'} and ${printCount} copies and paid ${paymentAmount}VN$`;
    console.log(result);
    return result;
}

module.exports = {
    findAllPrinters,
    findPrinterById,
    savePrinter,
    updatePrinter,
    deletePrinter,
    pay
}