require("dotenv").config();
const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// init database

// init routes
app.use("/", require("./routes/index"));

// handle error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  console.error(error.stack); // Print the error stack
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;