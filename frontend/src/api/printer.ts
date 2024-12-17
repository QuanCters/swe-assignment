import { Printer } from "@/models/printer";
import { HttpError } from "@/errors/HttpError";
const BaseUrl = import.meta.env.VITE_API_URL;

export const getPrinters = async () => {
  try {
    const access_token = localStorage.getItem("access-token");

    if (!access_token) {
      throw new Error("Access token not found. Please try to login again");
    }
    const response = await fetch(`${BaseUrl}/printer`, {
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
    console.error("Error fetching printers:", err);
    throw err;
  }
};

export const updatePrinter = async (data: Printer) => {
  try {
    const access_token = localStorage.getItem("access-token");
    const api_key = localStorage.getItem("x-api-key");
    if (!access_token || !api_key) {
      throw new Error(
        "Access token or x-api-key not found. Please try to login again"
      );
    }
    const response = await fetch(`${BaseUrl}/printer`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        CLIENT_ID: "x-client-id",
        AUTHORIZATION: access_token,
        "x-api-key": api_key,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok)
      throw new HttpError(response.statusText + data.id, response.status);
  } catch (err) {
    console.error("Error update printers:", err);
    throw err;
  }
};

export const addPrinter = async (printer: any) => {
  try {
    const access_token = localStorage.getItem("access-token");
    const api_key = localStorage.getItem("x-api-key");
    if (!access_token || !api_key) {
      throw new Error(
        "Access token or x-api-key not found. Please try to login again"
      );
    }
    const response = await fetch(`${BaseUrl}/printer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        CLIENT_ID: "x-client-id",
        AUTHORIZATION: access_token,
        "x-api-key": api_key,
      },
      body: JSON.stringify(printer),
    });
    if (!response.ok) throw new HttpError(response.statusText, response.status);
  } catch (err) {
    console.error("Error add printer:", err);
    throw err;
  }
};

export const getPrinterByID = async (id: string) => {
  try {
    const access_token = localStorage.getItem("access-token");
    const api_key = localStorage.getItem("x-api-key");
    if (!access_token || !api_key) {
      throw new Error(
        "Access token or x-api-key not found. Please try to login again"
      );
    }
    const response = await fetch(`${BaseUrl}/printer/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        CLIENT_ID: "x-client-id",
        AUTHORIZATION: access_token,
        "x-api-key": api_key,
      },
    });
    if (!response.ok) throw new HttpError(response.statusText, response.status);
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error getPrinterByID:", err);
    throw err;
  }
};

export const deletePrinterByID = async (id: string) => {
  try {
    const access_token = localStorage.getItem("access-token");
    const api_key = localStorage.getItem("x-api-key");
    if (!access_token || !api_key) {
      throw new Error(
        "Access token or x-api-key not found. Please try to login again"
      );
    }
    const response = await fetch(`${BaseUrl}/printer/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        CLIENT_ID: "x-client-id",
        AUTHORIZATION: access_token,
        "x-api-key": api_key,
      },
    });
    if (!response.ok)
      throw new HttpError(
        response.statusText + `printerId: ${id}`,
        response.status
      );
  } catch (err) {
    console.error("Error deletePrinterByID:", err);
    throw err;
  }
};
