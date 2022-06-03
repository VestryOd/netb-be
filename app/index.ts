import * as express from "express";
import * as config from "./config";
import * as fileUpload from "express-fileupload";
import * as httpContext from "express-http-context";

const app: express.Application = express();

app.use(fileUpload());

app.use(httpContext.middleware);

app.use(express.json());

app.listen(config.port, () =>
  console.log("Server is started!", `PORT: ${config.port}`)
);
