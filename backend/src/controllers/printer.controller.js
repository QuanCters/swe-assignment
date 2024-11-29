"use strict";

const printerService = require("../services/printer.service");

const findAllPrinters = async (req, res) => {
  const printers = await printerService.findAllPrinters();
  res.send(printers);
};

const findPrinterById = async (req, res) => {
  const { id } = req.params;
  const printer = await printerService.findPrinterById(id);
  res.send(printer);
};

const savePrinter = async (req, res) => {
  const printer = req.body;
  await printerService.savePrinter(printer);
  res.status(201).send();
};

const updatePrinter = async (req, res) => {
  const printer = req.body;
  await printerService.updatePrinter(printer);
  res.send();
};

const deletePrinter = async (req, res) => {
  const { id } = req.params;
  await printerService.deletePrinter(id);
  res.send();
};

module.exports = {
  findAllPrinters,
  findPrinterById,
  savePrinter,
  updatePrinter,
  deletePrinter,
};
