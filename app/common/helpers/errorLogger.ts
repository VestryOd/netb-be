import * as expressWinston from "express-winston";
import { loggerHelper } from "./loggerHelper";
import { HttpError } from "http-errors";

export const errorLogger = expressWinston.errorLogger({
  winstonInstance: loggerHelper,
  meta: false,
  // eslint-disable-next-line max-len
  msg: "HTTP ({{err.statusCode}}) {{req.method}}: {{req.path}}, params: {{JSON.stringify(req.query)}}, body: {{JSON.stringify(req.body)}}, message: {{err.message}}",
  skip: (req, res, err) => err && err instanceof HttpError,
});
