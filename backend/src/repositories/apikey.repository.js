"use strict";

const getApiKey = async (key) => {
  const response = await fetch(
    `https://json-server-s4l1.onrender.com/apikeys?x-api-key=${key}`
  );
  return response.json();
};

module.exports = {
  getApiKey,
};
