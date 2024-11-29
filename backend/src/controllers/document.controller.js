"use strict"

const documentService = require('../services/document.service');

const findAllDocuments = async (req, res) => {
    const documents = await documentService.findAllDocuments();
    res.json(documents);
}

const findDocumentById = async (req, res) => {
    const document = await documentService.findDocumentById(req.params.id);
    res.json(document);
}

const saveDocument = async (req, res) => {
    const document = await documentService.saveDocument(req.body);
    res.json(document);
}

const deleteDocument = async (req, res) => {
    await documentService.deleteDocument(req.params.id);
    res.json({ message: 'Document deleted successfully' });
}

module.exports = {
    findAllDocuments,
    findDocumentById,
    saveDocument,
    deleteDocument
};