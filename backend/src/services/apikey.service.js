"use strict";

const { getApiKey } = require("../repositories/apikey.repository");

const findById = async (key) => {
  const objKey = await getApiKey(key);
  return objKey;
};

module.exports = {
  findById,
};
