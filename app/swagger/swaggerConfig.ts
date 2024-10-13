import { SwaggerDefinition, Options } from "swagger-jsdoc";
import { basicUrl, port } from "@/config";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Front interview quiz API",
    version: "1.0.0",
    description:
      "This is a simple app for preparation for frontend interview based on the OpenAPI 3.0 specification",
    contact: {
      email: "vestry.odessa@gmail.com",
    },
  },
  servers: [
    {
      url: `${basicUrl}:${port}`,
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

export const swaggerOptions: Options = {
  swaggerDefinition,
  apis: [
    "./app/routing/**/*.ts",
    "./app/db/models/**/*.ts",
    "./app/common/enums/**/*.ts",
  ],
};
