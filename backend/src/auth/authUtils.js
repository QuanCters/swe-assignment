"use strict";
const { asyncHandler } = require("../helpers/asyncHandler");
const { AuthFailureError } = require("../core/error.response");

const HEADER = {
  KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const authentication = asyncHandler(async (req, res, next) => {
  const access_token = req.headers[HEADER.AUTHORIZATION];
  if (!access_token || access_token === "") {
    return next(new AuthFailureError("Invalid Request"));
  }
  // TODO: Check if userId is valid
  try {
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = {
  authentication,
};
