"use strict"

const documentCtrl = require("../controllers/document.controller");

const express = require("express");
const router = express.Router();

// available to users and spso
router.get("/", documentCtrl.findAllDocuments);
router.post("/", documentCtrl.saveDocument);
router.get("/:id", documentCtrl.findDocumentById);
router.delete("/:id", documentCtrl.deleteDocument);

module.exports = router;