"use strict";

const findAllHistories = async () => {
    const histories = await fetch(`https://json-server-s4l1.onrender.com/history`);
    if (!histories.ok) {
        throw new Error(`Error fetching histories: ${histories.statusText}`);
    }
    return histories.json();
}

const findHistoryByUserId = async (userId) => {
    const histories = await fetch(`https://json-server-s4l1.onrender.com/history?studentId=${userId}`);
    if (!histories.ok) {
        throw new Error(`Error fetching histories: ${histories.statusText}`);
    }
    return histories.json();
}

const saveHistory = async (history) => {
    const response = await fetch(`https://json-server-s4l1.onrender.com/history`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...history, timestamp: new Date().toISOString() })
    });
    if (!response.ok) {
        throw new Error(`Error saving history: ${response.statusText}`);
    }
    return response.json();
}

module.exports = {
    findAllHistories,
    findHistoryByUserId,
    saveHistory,
}