"use strict";

const {
  BadRequestError,
  AuthFailureError,
  NotFoundError,
} = require("../core/error.response");
const jwt = require("jsonwebtoken");
const { findUserByEmail, findUserByAccessToken } = require("./user.service");

const ROLE = {
  STUDENT: "0000",
  SPSO: "1111",
};

class AccessService {
  static generateAccessToken = async () => {
    const accessToken = jwt.sign(
      { role: ROLE.STUDENT },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    return accessToken;
  };

  static logout = async ({ access_token, role }) => {
    if (!access_token) {
      throw new BadRequestError("Access token is required for logout");
    }

    const foundUser = await findUserByAccessToken({ access_token, role });
    console.log(foundUser);

    if (!foundUser) {
      throw new NotFoundError("User not found for the provided access token");
    }

    const updateResponse = await fetch(
      `https://json-server-s4l1.onrender.com/${
        role === "0000" ? "students" : "SPSOs"
      }/${foundUser[0].id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: foundUser[0].id,
          email: foundUser[0].email,
          password: foundUser[0].password,
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
    // 1: Check if email in database
    const foundUser = await findUserByEmail({ email, role });
    if (!foundUser) {
      throw new NotFoundError("User not found");
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
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: foundUser[0].id,
          email: foundUser[0].email,
          password: foundUser[0].password,
          access_token: accessToken,
        }),
      }
    );
    if (!updateResponse.ok) {
      throw new BadRequestError("Failed to update access token");
    }
    return {
      status: 200,
      message: "Login successful",
      accessToken,
    };
  };
}

module.exports = {
  AccessService,
};
