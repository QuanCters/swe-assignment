"use strict";

const getApiKey = async (key) => {
  const response = await fetch(`http://localhost:3000/apikeys?key=${key}`);
  return response.json();
};

module.exports = {
  getApiKey,
};
