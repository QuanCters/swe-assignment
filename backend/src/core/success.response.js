"use strict";

const StatusCode = require("../utils/StatusCode");
const ReasonPhrases = require("../utils/ReasonPhrases");

class SuccessResponse {
  constructor({ statusCode = StatusCode.OK, response }) {
    this.status = statusCode;
    this.response = response;
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this.response);
  }
}

module.exports = SuccessResponse;
