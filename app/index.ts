import "module-alias/register";
import * as express from "express";
import * as fileUpload from "express-fileupload";
import * as httpContext from "express-http-context";
// import { join } from "path";
import * as config from "@/config";
// import { LocalDataService } from "@/services/localData.service";
import * as path from "path";
import protectedRouter from "./routes/private";
import { composePublicMiddleware } from "./middlewares";

// const dataService = new LocalDataService(join(__dirname, "db/db.json"));

const app: express.Application = express();

app.use(fileUpload());

app.use(httpContext.middleware);

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.json());

process.on("SIGINT", () => process.exit(1));

app.use("/:discipline", composePublicMiddleware, protectedRouter);

app.listen(config.port, () =>
  console.log("Server is started!", `PORT: ${config.port}`)
);
