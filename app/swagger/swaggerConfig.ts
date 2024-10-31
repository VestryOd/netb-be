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
  tags: [
    { name: "Authentication", description: "User authentication operations" },
    { name: "Theory", description: "Endpoints related to theory operations" },
    {
      name: "Practice",
      description: "Endpoints related to practice operations",
    },
  ],
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
    responses: {
      BadRequestByIdError: {
        description: "Bad request due to invalid identifier",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Bad request, reason: invalid identifier",
                },
              },
            },
          },
        },
      },
      UnauthorizedError: {
        description: "Unauthorized access - user authentication is required",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "User is unauthorized",
                },
              },
            },
          },
        },
      },
      PermissionDeniedError: {
        description: "Permission denied by the provided role",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example:
                    "Access for the requested resource is forbidden by the provided role permissions",
                },
              },
            },
          },
        },
      },
      NotFoundError: {
        description: "Entity was not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example:
                    "The requested resource by provided id was not found",
                },
              },
            },
          },
        },
      },
      DisciplineNotFoundError: {
        description: "Discipline was not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Discipline with provided name was not found",
                },
              },
            },
          },
        },
      },
      MediaFilesNotFoundError: {
        description: "Media file is not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Media files for a new created theory was not found",
                },
              },
            },
          },
        },
      },
    },
  },
};

export const swaggerOptions: Options = {
  swaggerDefinition,
  apis: [
    "./app/routing/**/*.ts",
    "./app/db/models/**/*.ts",
    "./app/common/enums/**/*.ts",
  ],
};
