"use strict";

const { AccessService } = require("../services/access.service");
const SuccessReponse = require("../core/success.response");
const { access } = require("fs");

const ROLE = {
  STUDENT: "0000",
  SPSO: "1111",
};

class AccessController {
  logoutStudent = async (req, res) => {
    const access_token = req.headers["authorization"];
    new SuccessReponse({
      response: await AccessService.logout({
        access_token: access_token,
        role: ROLE.STUDENT,
      }),
    }).send(res);
  };

  confirmPassword = async (req, res) => {
    const access_token = req.headers["authorization"];
    new SuccessReponse({
      response: await AccessService.confirmPassword({
        ...req.body,
        access_token: access_token,
        role: ROLE.STUDENT,
      }),
    }).send(res);
  };

  logoutSPSO = async (req, res) => {
    const access_token = req.headers["authorization"];
    new SuccessReponse({
      response: await AccessService.logout({
        ...req.body,
        access_token: access_token,
        role: ROLE.SPSO,
      }),
    }).send(res);
  };

  loginStudent = async (req, res) => {
    new SuccessReponse({
      response: await AccessService.login({ ...req.body, role: ROLE.STUDENT }),
    }).send(res);
  };

  loginSPSO = async (req, res) => {
    new SuccessReponse({
      response: await AccessService.login({ ...req.body, role: ROLE.SPSO }),
    }).send(res);
  };
}

module.exports = new AccessController();
