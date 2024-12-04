"use strict";

const printerRepo = require("../repositories/printer.repository");
const { pay } = require("./payment.service");
const { saveHistory } = require("./history.service");
const { findDocumentById } = require("./document.service");
const { findUserById } = require("../repositories/user.repository");
const { calculatePaymentAmount } = require("./payment.service");

const findAllPrinters = async () => {
    return await printerRepo.findAllPrinters();
};

const findPrinterById = async (id) => {
    return await printerRepo.findPrinterById(id);
};

const savePrinter = async (printer) => {
    return await printerRepo.savePrinter(printer);
};

const updatePrinter = async (printer) => {
    return await printerRepo.updatePrinter(printer);
};

const togglePrinterStatus = async (id, status) => {
    return await printerRepo.togglePrinterStatus(id, status);
};

const deletePrinter = async (id) => {
    return await printerRepo.deletePrinter(id);
};

const print = async ({ printInfo }) => {
    const { userId, printerId, documentId, config } = printInfo;

    const printer = await findPrinterById(printerId);
    if (printer.status !== "Online") {
        throw new Error(`Printer ${printerId} is not online`);
    }
    const document = await findDocumentById(documentId);
    if (!document) {
        throw new Error(`Document ${documentId} not found`);
    }

    const pageCount = document.pageCount;
    const paymentAmount = await pay({
        paymentInfo: { userId, pageCount, config },
    });
    await saveHistory({
        studentId: userId,
        printerId,
        printerName: printer.name,
        documentId,
        documentName: document.fileName,
        documentPageCount: document.pageCount,
        pageType: config.pageType,
        paymentAmount,
    });
    const result = `User ${userId} printed ${pageCount} pages on printer ${printerId} with ${config.color
        } color, ${config.pageType} page type, ${config.duplex ? "duplex" : "simplex"
        } and ${config.printCount} copies and paid ${paymentAmount} pages`;
    console.log(result);
    return result;
};

const printCheck = async ({ printInfo }) => {
    const { userId, printerId, documentId, config } = printInfo;

    const user = await findUserById({ id: userId, role: "0000" });
    const document = await findDocumentById(documentId);
    if (!document) {
        throw new Error(`Document ${documentId} not found`);
    }

    const pageCount = document.pageCount;

    const paymentAmount = calculatePaymentAmount({ pageCount, config });
    const pageBalance = user.pageBalance

    return { paymentAmount, pageBalance };
};


module.exports = {
    findAllPrinters,
    findPrinterById,
    savePrinter,
    updatePrinter,
    deletePrinter,
    pay,
    print,
    togglePrinterStatus,
    printCheck,
};
