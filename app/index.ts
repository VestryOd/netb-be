import "module-alias/register";
import * as express from "express";
import * as fileUpload from "express-fileupload";
import * as httpContext from "express-http-context";
import * as config from "@/config";
import * as path from "path";
import protectedRouter from "./routes/private";
import { composePublicMiddleware } from "./middlewares";
import { connectToDB, closeConnection } from "@/db";
import {
  uncaughtExceptionHandler,
  unhandledPromiseRejectionHandler,
} from "./common/helpers";

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
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(httpContext.middleware);

app.use("/:discipline", composePublicMiddleware, protectedRouter);

connectToDB(() => {
  app.listen(config.port, () =>
    console.log("Server is started!", `PORT: ${config.port}`)
  );
});
