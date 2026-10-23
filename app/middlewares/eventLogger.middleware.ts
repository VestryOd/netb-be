import * as expressWinston from "express-winston";
import { loggerHelper } from "@/common/helpers";

export const eventLoggerMiddleware = expressWinston.logger({
  winstonInstance: loggerHelper,
  statusLevels: true,
  meta: false,
  // eslint-disable-next-line max-len
  msg: "HTTP ({{res.statusCode}}) {{req.method}}: {{req.path}}, params: {{JSON.stringify(req.params)}}, body: {{JSON.stringify(req.body)}}",
});
