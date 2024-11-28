const app = require("./src/app");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`SSPS Service start with address: http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log(`EXIT SERVER EXPRESS`));
});
