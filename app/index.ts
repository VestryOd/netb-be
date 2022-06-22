import "module-alias/register";
import * as express from "express";
import * as fileUpload from "express-fileupload";
import * as httpContext from "express-http-context";
import * as config from "@/config";
import * as path from "path";
import protectedRouter from "./routes/private";
import { composePublicMiddleware } from "./middlewares";
import {
  uncaughtExceptionHandler,
  unhandledPromiseRejectionHandler,
} from "./common/helpers";

process
  .on("unhandledRejection", unhandledPromiseRejectionHandler)
  .on("uncaughtException", uncaughtExceptionHandler)
  .on("SIGINT", () => process.exit(1))
  .on("beforeExit", () => console.log("Exit server"));

const app: express.Application = express();

app.use(fileUpload());

app.use(httpContext.middleware);

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/:discipline", composePublicMiddleware, protectedRouter);

app.listen(config.port, () =>
  console.log("Server is started!", `PORT: ${config.port}`)
);
