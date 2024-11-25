"use strict"

const printerCtrl = require('../controllers/printer.controller');

const express = require('express');
const router = express.Router();

// available to users and spso
router.get('/', printerCtrl.findAllPrinters);
router.get('/:id', printerCtrl.findPrinterById);

// available to spso
router.post('/', printerCtrl.savePrinter);
router.put('/', printerCtrl.updatePrinter);
router.delete('/:id', printerCtrl.deletePrinter);

module.exports = router;
