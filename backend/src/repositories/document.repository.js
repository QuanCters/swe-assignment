"use strict"

const findAllDocuments = async () => {
    const response = await fetch(`https://json-server-s4l1.onrender.com/documents`);

    if (!response.ok) {
        throw new Error(`Error fetching documents: ${response.statusText}`);
    }

    return response.json();
}

const findDocumentById = async (id) => {
    const response = await fetch(`https://json-server-s4l1.onrender.com/documents/${id}`);

    if (!response.ok) {
        throw new Error(`Error fetching document: ${response.statusText}`);
    }

    return response.json();
}

const saveDocument = async (document) => {
    const response = await fetch(`https://json-server-s4l1.onrender.com/documents`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(document)
    });

    if (!response.ok) {
        throw new Error(`Error saving document: ${response.statusText}`);
    }

    return response.json();
}

const deleteDocument = async (id) => {
    const response = await fetch(`https://json-server-s4l1.onrender.com/documents/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`Error deleting document: ${response.statusText}`);
    }
}

module.exports = {
    findAllDocuments,
    findDocumentById,
    saveDocument,
    deleteDocument
};