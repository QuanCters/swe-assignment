import { HttpError } from "@/errors/HttpError";

const BaseUrl = "http://localhost:5000/v1/api";

export const loginWithRole = async (roleName: string, data: any) => {
  try {
    const response = await fetch(`${BaseUrl}/user/login-${roleName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        CLIENT_ID: "x-client-id",
        AUTHORIZATION: "authorization",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new HttpError(response.statusText, response.status);

    const result = await response.json();
    console.log(
      result,
      // result.metadata,
      // result.metadata?.accessToken,
      "halo halo"
    );
    if (result.status !== 200)
      throw new HttpError(result.status, result.message);

    localStorage.setItem("access-token", result.accessToken);
    localStorage.setItem("userID", result.userID);
    if (roleName === "spso")
      localStorage.setItem("x-api-key", result["x-api-key"]);
  } catch (err) {
    console.log("Error with loginWithRole", err);
    throw err;
  }
};

export const logoutWithRole = async (roleName: string) => {
  try {
    const access_token = localStorage.getItem("access-token");
    const api_key = localStorage.getItem("x-api-key");
    if (!access_token || (!api_key && roleName === "spso")) {
      throw new Error(
        "Access token or x-api-key not found. Please try to login again"
      );
    }

    const headers = {
      "Content-Type": "application/json",
      CLIENT_ID: "x-client-id",
      AUTHORIZATION: access_token,
      ...(roleName === "spso" && api_key ? { "x-api-key": api_key } : {}),
    };

    const response = await fetch(`${BaseUrl}/user/logout-${roleName}`, {
      method: "POST",
      headers: headers,
    });

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status);
    }
    const result = await response.json();
    if (result.status !== 200)
      throw new HttpError(result.status, result.message);

    localStorage.removeItem("access-token");
    localStorage.removeItem("userID");
    if (roleName === "spso") localStorage.removeItem("x-api-key");
  } catch (err) {
    console.log("Error with logoutWithRole", err);
    throw err;
  }
};