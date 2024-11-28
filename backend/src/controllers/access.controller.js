"use strict";

const { AccessService } = require("../services/access.service");
const SuccessReponse = require("../core/success.response");

const ROLE = {
  STUDENT: "0000",
  SPSO: "1111",
};

class AccessController {
  logoutStudent = async (req, res) => {
    const access_token = req.headers["authorization"];
    new SuccessReponse({
      message: "Logout success!",
      metadata: await AccessService.logout({
        access_token: access_token,
        role: ROLE.STUDENT,
      }),
    }).send(res);
  };

  logoutSPSO = async (req, res) => {
    new SuccessReponse({
      message: "Logout success!",
      metadata: await AccessService.logout({ ...req.body, role: ROLE.SPSO }),
    }).send(res);
  };

  loginStudent = async (req, res) => {
    new SuccessReponse({
      metadata: await AccessService.login({ ...req.body, role: ROLE.STUDENT }),
    }).send(res);
  };

  loginSPSO = async (req, res) => {
    new SuccessReponse({
      metadata: await AccessService.login({ ...req.body, role: ROLE.SPSO }),
    }).send(res);
  };
}

module.exports = new AccessController();
