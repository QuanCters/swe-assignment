"use strict";

const {
  BadRequestError,
  AuthFailureError,
  NotFoundError,
} = require("../core/error.response");
const jwt = require("jsonwebtoken");
const {
  findUserByEmail,
  findUserByAccessToken,
} = require("../repositories/user.repository");

const ROLE = {
  STUDENT: "0000",
  SPSO: "1111",
};

class AccessService {
  static generateAccessToken = async () => {
    const accessToken = jwt.sign({ role: ROLE.STUDENT }, "HCMUT", {
      expiresIn: "1h",
    });
    return accessToken;
  };

  static logout = async ({ access_token, role }) => {
    if (!access_token) {
      throw new BadRequestError("Access token is required for logout");
    }

    const foundUser = await findUserByAccessToken({ access_token, role });

    if (!foundUser) {
      throw new NotFoundError("User not found for the provided access token");
    }

    const updateResponse = await fetch(
      `https://json-server-s4l1.onrender.com/${
        role === "0000" ? "students" : "SPSOs"
      }/${foundUser[0].id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: "",
        }),
      }
    );

    if (!updateResponse.ok) {
      throw new BadRequestError("Failed to delete access token");
    }

    return {
      status: 200,
      message: "Logout successful",
    };
  };

  static login = async ({ email, password, role }) => {
    // Check if user is already logged in
    const foundUser = await findUserByEmail({ email, role });
    // 1: Check if email in database
    if (!foundUser[0]) {
      throw new NotFoundError("User not found");
    }

    // 1.1: Check if user already logged in
    if (foundUser[0].access_token !== "") {
      return {
        status: 409,
        message: "User is already logged in",
      };
    }

    // 2: Verify password
    // const match = await compare(password, foundUser.password);
    let match = password === foundUser[0].password ? 1 : 0;
    if (!match) {
      throw new AuthFailureError("Authentication Error");
    }

    // 3: Generate access token
    const accessToken = await AccessService.generateAccessToken();

    // 4: Update access token to database
    const updateResponse = await fetch(
      `https://json-server-s4l1.onrender.com/${
        role === "0000" ? "students" : "SPSOs"
      }/${foundUser[0].id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: accessToken,
        }),
      }
    );
    if (!updateResponse.ok) {
      throw new BadRequestError("Failed to update access token");
    }

    const response = {
      status: 200,
      message: "Login successful",
      accessToken,
    };

    // Add "x-api-key" only if the role is not "0000"
    if (role !== "0000") {
      response["x-api-key"] = foundUser[0]["x-api-key"];
    }

    return response;
  };
}

module.exports = {
  AccessService,
};
