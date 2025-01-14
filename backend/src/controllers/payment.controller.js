"use strict";

const paymentService = require("../services/payment.service");

const payment = async (req, res) => {
  const payment = await paymentService.payment({ ...req.body });
  res.json(payment);
};

const callback = async (req, res) => {
  const callback = await paymentService.callback(req.body);
  res.json(callback);
};

const transactionStatus = async (req, res) => {
  const transactionStatus = await paymentService.transactionStatus(req.body);
  res.json(transactionStatus);
};

module.exports = { payment, callback, transactionStatus };
