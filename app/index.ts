import "module-alias/register";
import * as express from "express";
import * as fileUpload from "express-fileupload";
import * as httpContext from "express-http-context";
import { join } from "path";
import * as config from "@/config";
import { LocalDataService } from "@/services/localData.service";
import * as path from "path";

const dataService = new LocalDataService(join(__dirname, "db/db.json"));

const app: express.Application = express();

app.use(fileUpload());

app.use(httpContext.middleware);

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.json());

process.on("SIGINT", () => process.exit(1));

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get("/", async (req, res, next) => {
  const data = await dataService.getData("js-theory");
  console.log("--theory", data);
  res.send(data);
  next();
});

app.post("/", (req, res, next) => {
  dataService.writeData(JSON.stringify(req.body, null, 2));
  res.statusCode = 200;
  res.send("Saved");
  next();
});

app.listen(config.port, () =>
  console.log("Server is started!", `PORT: ${config.port}`)
);
