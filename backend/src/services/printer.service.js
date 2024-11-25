"use strict"

const printerRepo = require('../repositories/printer.repository');

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

module.exports = {
    findAllPrinters,
    findPrinterById,
    savePrinter,
    updatePrinter,
    deletePrinter
}