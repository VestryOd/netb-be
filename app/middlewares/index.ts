import { compose } from "compose-middleware";
import { authMiddleware, authMiddlewareByRole } from "./auth.middleware";
import { RolesEnum } from "@/common/enums";

export * from "./error.middleware";
export * from "./customBodyParse.middleware";
export * from "./saveMedia.middleware";
export * from "./auth.middleware";
export * from "./discipline.middleware";

export const composePublicMiddleware = compose([]);

export const composeProtectedDisciplineMiddleware = compose([
  authMiddleware,
  authMiddlewareByRole[RolesEnum.TEACHER],
]);
