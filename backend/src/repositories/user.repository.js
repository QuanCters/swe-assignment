"use strict";

const ROLE = {
  STUDENT: "0000",
  SPSO: "1111",
};

const findUserByEmail = async ({ email, role }) => {
  const response = await fetch(
    `https://json-server-s4l1.onrender.com/${
      role === ROLE.STUDENT ? "students" : "SPSOs"
    }?email=${email}`
  );

  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.statusText}`);
  }

  return response.json();
};

const findUserByAccessToken = async ({ access_token, role }) => {
  const response = await fetch(
    `https://json-server-s4l1.onrender.com/${
      role === ROLE.STUDENT ? "students" : "SPSOs"
    }?access_token=${access_token}`
  );

  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.statusText}`);
  }

  return response.json();
};

module.exports = { findUserByEmail, findUserByAccessToken };
