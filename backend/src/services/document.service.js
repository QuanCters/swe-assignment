"use strict"

const documentRepo = require('../repositories/document.repository');

const findAllDocuments = async () => {
    return await documentRepo.findAllDocuments();
}

const findDocumentById = async (id) => {
    return await documentRepo.findDocumentById(id);
}

const saveDocument = async (document) => {
    return await documentRepo.saveDocument(document);
}

const deleteDocument = async (id) => {
    return await documentRepo.deleteDocument(id);
}

module.exports = {
    findAllDocuments,
    findDocumentById,
    saveDocument,
    deleteDocument
};