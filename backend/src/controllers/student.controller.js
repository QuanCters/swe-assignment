"use strict";

const { print: printService, printCheck: printCheckService } = require("../services/printer.service");
const { buyPages: buyPagesService } = require("../services/payment.service");
const {
  updateStudentPageBalance: updateStudentPageBalanceRepo,
} = require("../repositories/user.repository");

const print = async (req, res) => {
  const { userId, printerId } = req.params;
  const { documentId, config } = req.body;
  const printInfo = { userId, printerId, documentId, config };
  const result = await printService({ printInfo });
  res.send({ status: 200, message: "Printed successfully" });
};

const updateStudentPageBalance = async (req, res) => {
  const id = req.params.userId;
  const { pageBalance } = req.body;
  const result = await updateStudentPageBalanceRepo({ id, pageBalance });
  res.send({ status: 200, message: "Updated successfullly" });
};

const buyPages = async (req, res) => {
  const userId = req.params.userId;
  const { pageCount } = req.body;
  const result = await buyPagesService({ userId, pageCount });
  res.send({ status: 200, message: "Buy successfully", pageCount: result });
};

const printCheck = async (req, res) => {
  const { userId, printerId } = req.params;
  const { documentId, config } = req.body;
  const printInfo = { userId, printerId, documentId, config };
  const result = await printCheckService({ printInfo });
  res.send({ status: 200, message: "lmao", ...result });
}

module.exports = {
  print,
  updateStudentPageBalance,
  buyPages,
  printCheck,
};
