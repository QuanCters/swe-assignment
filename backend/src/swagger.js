import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HCMUT_SSPS API",
      description: "API endpoints for printing services on swagger",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"],
  requestInterceptor: function (request) {
    request.headers.Origin = `http://localhost:5000`;
    return request;
  },
  url: `http://localhost:5000/api-docs`,
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default swaggerDocs;
