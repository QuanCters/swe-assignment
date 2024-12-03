"use strict";

const documentService = require("../services/document.service");

const findAllDocuments = async (req, res) => {
  const documents = await documentService.findAllDocuments();
  res.status(200).json(documents);
};

const findDocumentById = async (req, res) => {
  const document = await documentService.findDocumentById(req.params.id);
  res.status(200).json(document);
};

const saveDocument = async (req, res) => {
  const document = await documentService.saveDocument(req.body);
  res
    .status(201)
    .json({
      status: 201,
      message: "Save Document Successfully",
      id: document.id,
    });
};

const deleteDocument = async (req, res) => {
  await documentService.deleteDocument(req.params.id);
  res
    .status(200)
    .json({ status: 200, message: "Document deleted successfully" });
};

module.exports = {
  findAllDocuments,
  findDocumentById,
  saveDocument,
  deleteDocument,
};
