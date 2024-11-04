import "module-alias/register";
import express from "express";
import fileUpload from "express-fileupload";
import * as httpContext from "express-http-context";
import * as config from "@/config";
import * as path from "path";
import { connectToDB, closeConnection } from "@/db";
import * as swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./swagger/swaggerConfig";
import {
  notFoundHandler,
  uncaughtExceptionHandler,
  unhandledPromiseRejectionHandler,
} from "./common/helpers";
import { MainRoutes } from "./common/constants";
import { routingSchema } from "./routing/routes";
import { eventLoggerMiddleware } from "./middlewares/eventLogger.middleware";

process
  .on("unhandledRejection", unhandledPromiseRejectionHandler)
  .on("uncaughtException", uncaughtExceptionHandler)
  .on("SIGINT", () => {
    closeConnection().catch((e) => console.log(e));
    process.exit(1);
  })
  .on("beforeExit", () => {
    closeConnection().catch((e) => console.log(e));
  });

const app: express.Application = express();

app.use(fileUpload());

app.use(express.json());
app.use(MainRoutes.Static, express.static(path.join(__dirname, "public")));
app.use(httpContext.middleware);

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(MainRoutes.ApiDocs, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("*", eventLoggerMiddleware);
routingSchema.forEach(({ prefix, middlewares, routes }) => {
  middlewares ? app.use(prefix, middlewares, routes) : app.use(prefix, routes);
});
app.use("*", notFoundHandler);

connectToDB(() => {
  app.listen(config.port, () =>
    console.log("Server is started!", `PORT: ${config.port}`)
  );
});
