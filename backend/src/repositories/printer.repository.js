"use strict";

const findAllPrinters = async () => {
  const response = await fetch(
    `https://json-server-s4l1.onrender.com/printers`
  );

  if (!response.ok) {
    throw new Error(`Error fetching printers: ${response.statusText}`);
  }

  return response.json();
};

const findPrinterById = async (id) => {
  const response = await fetch(
    `https://json-server-s4l1.onrender.com/printers/${id}`
  );

  if (!response.ok) {
    throw new Error(`Error fetching printer: ${response.statusText}`);
  }

  return response.json();
};

const savePrinter = async (printer) => {
  const response = await fetch(
    `https://json-server-s4l1.onrender.com/printers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(printer),
    }
  );

  if (!response.ok) {
    throw new Error(`Error saving printer: ${response.statusText}`);
  }

  return response.json();
};

const updatePrinter = async (printer) => {
  const response = await fetch(
    `https://json-server-s4l1.onrender.com/printers/${printer.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(printer),
    }
  );

  if (!response.ok) {
    throw new Error(`Error updating printer: ${response.statusText}`);
  }

  return response.json();
};

const togglePrinterStatus = async (id, status) => {
  const response = await fetch(
    `https://json-server-s4l1.onrender.com/printers/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(status),
    }
  );

  if (!response.ok) {
    throw new Error(`Error toggling printer status: ${response.statusText}`);
  }

  return response.json();
};

const deletePrinter = async (id) => {
  const response = await fetch(
    `https://json-server-s4l1.onrender.com/printers/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(`Error deleting printer: ${response.statusText}`);
  }

  return response.json();
};

module.exports = {
  findAllPrinters,
  findPrinterById,
  savePrinter,
  updatePrinter,
  deletePrinter,
  togglePrinterStatus,
};
