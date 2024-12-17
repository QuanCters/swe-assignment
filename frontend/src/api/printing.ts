import { HttpError } from "@/errors/HttpError";
const BaseUrl = import.meta.env.VITE_API_URL;

export const saveDocument = async (data: any) => {
  const access_token = localStorage.getItem("access-token");
  if (!access_token) {
    throw new Error("Access token not found. Please try to login again");
  }
  const response = await fetch(`${BaseUrl}/document`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      CLIENT_ID: "x-client-id",
      AUTHORIZATION: access_token,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new HttpError(response.statusText, response.status);
  const result = await response.json();
  return result;
};

export const getDocumentByID = async (id: string) => {
  try {
    const access_token = localStorage.getItem("access-token");
    if (!access_token) {
      throw new Error("Access token not found. Please try to login again");
    }
    const response = await fetch(`${BaseUrl}/document/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        CLIENT_ID: "x-client-id",
        AUTHORIZATION: access_token,
      },
    });
    if (!response.ok) throw new HttpError(response.statusText, response.status);
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error getDocumentByID:", err);
    throw err;
  }
};

export const deleteDocumentByID = async (id: string) => {
  try {
    const access_token = localStorage.getItem("access-token");
    if (!access_token) {
      throw new Error("Access token not found. Please try to login again");
    }
    const response = await fetch(`${BaseUrl}/document/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        CLIENT_ID: "x-client-id",
        AUTHORIZATION: access_token,
      },
    });
    if (!response.ok) throw new HttpError(response.statusText, response.status);
    const result = await response.json();
    if (result.status !== 200 || result.status !== 304)
      throw new HttpError(result.message, result.status);
    return result;
  } catch (err) {
    console.error("Error deleteDocumentByID:", err);
    throw err;
  }
};

export const getAllHistory = async () => {
  try {
    const access_token = localStorage.getItem("access-token");
    const api_key = localStorage.getItem("x-api-key");
    if (!access_token || !api_key) {
      throw new Error(
        "Access token or x-api-key not found. Please try to login again"
      );
    }
    const response = await fetch(`${BaseUrl}/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        AUTHORIZATION: access_token,
        "x-api-key": api_key,
      },
    });
    if (!response.ok) throw new HttpError(response.statusText, response.status);
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error fetching all history:", err);
    throw err;
  }
};

export const getHistoryByStudentID = async () => {
  try {
    const access_token = localStorage.getItem("access-token");
    const userID = localStorage.getItem("userID");
    if (!access_token || !userID) {
      throw new Error(
        "Access token or userID not found. Please try to login again"
      );
    }
    const response = await fetch(`${BaseUrl}/history/student/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        CLIENT_ID: "x-client-id",
        AUTHORIZATION: access_token,
      },
    });
    if (!response.ok) throw new HttpError(response.statusText, response.status);
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error getHistoryByStudentID:", err);
    throw err;
  }
};

export const printPages = async (printerID: string, data: any) => {
  const access_token = localStorage.getItem("access-token");
  const userID = localStorage.getItem("userID");
  if (!access_token || !userID) {
    throw new Error(
      "Access token or userID not found. Please try to login again"
    );
  }
  const response = await fetch(
    `${BaseUrl}/student/${userID}/print/${printerID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        CLIENT_ID: "x-client-id",
        AUTHORIZATION: access_token,
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) throw new HttpError(response.statusText, response.status);
  const result = await response.json();
  return result.message;
};

export const printPagesCheck = async (printerID: string, data: any) => {
  const access_token = localStorage.getItem("access-token");
  const userID = localStorage.getItem("userID");
  if (!access_token || !userID) {
    throw new Error(
      "Access token or userID not found. Please try to login again"
    );
  }
  const response = await fetch(
    `${BaseUrl}/student/${userID}/printcheck/${printerID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        CLIENT_ID: "x-client-id",
        AUTHORIZATION: access_token,
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) throw new HttpError(response.statusText, response.status);
  const result = await response.json();
  return result;
};
