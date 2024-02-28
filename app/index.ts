import "module-alias/register";
import * as express from "express";
import * as fileUpload from "express-fileupload";
import * as httpContext from "express-http-context";
import * as config from "@/config";
import * as path from "path";
import { Types } from "mongoose";
import { connectToDB, closeConnection } from "@/db";
import {
  notFoundHandler,
  uncaughtExceptionHandler,
  unhandledPromiseRejectionHandler,
} from "./common/helpers";
import { MainRoutes } from "./common/constants";
import { routingSchema } from "./routing/routes";
import { eventLoggerMiddleware } from "./middlewares/eventLogger.middleware";
import { LocalDataService } from "./services/LocalData.service";

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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use("/test", async (req, res, next) => {
  console.log("--head", req.headers);
  const fileName = path.join(__dirname, "/db/db.json");
  const service = new LocalDataService(fileName);
  const contentPath = path.join(__dirname, "/db/__seedData/practice.json");

  const { data } = await service.getData("js-practice");
  const discipline = "js";

  const updated = data.map((item: any) => {
    const { code, answers: ans, right_answer: rightAnswers, details } = item;
    const _id = new Types.ObjectId();
    const answers = ans
      ? Object.values(ans).map((el: string) => el.replace(/^[A-Z]{1}:\s/, ""))
      : ans;
    const right_answer = rightAnswers
      ? [Object.values(ans).indexOf(ans[rightAnswers])]
      : rightAnswers;
    return { _id, discipline, code, answers, right_answer, details };
  });

  service.writeData(JSON.stringify(updated, null, 2), contentPath);

  res.setHeader("Set-Cookie", "someCookie=1234567");
  res.send(updated);
  // next();
});

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
