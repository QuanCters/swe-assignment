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
    const printer = await findPrinterById(printerId);
    if (printer.status !== 'Online') {
        throw new Error(`Printer ${printerId} is not online`);
    }
    const pageCount = documentId;
    const paymentAmount = await pay({ paymentInfo: { userId, pageCount, config } });
    const result = `User ${userId} printed ${pageCount} pages on printer ${printerId} with ${config.color} color, ${config.pageType} page type, ${config.duplex ? 'duplex' : 'simplex'} and ${config.printCount} copies and paid ${paymentAmount} pages`;
    console.log(result);
    return result;
}

module.exports = {
    findAllPrinters,
    findPrinterById,
    savePrinter,
    updatePrinter,
    deletePrinter,
    pay,
    print,
}