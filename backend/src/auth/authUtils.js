"use strict";
const { asyncHandler } = require("../helpers/asyncHandler");
const { AuthFailureError } = require("../core/error.response");

const HEADER = {
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

const authentication = asyncHandler(async (req, res, next) => {
  // const userId = req.headers[HEADER.CLIENT_ID];
  // if (!userId) {
  //   return next(new AuthFailureError("Invalid Request"));
  // }

  const access_token = req.headers[HEADER.AUTHORIZATION];
  if (!access_token) {
    return next(new AuthFailureError("Invalid Request"));
  }

  // TODO: Verify Access Token

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
