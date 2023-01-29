import { RolesEnum } from "../enums";

export const accessLevelByRole: Record<string, number> = {
  [RolesEnum.USER]: 1,
  [RolesEnum.TEACHER]: 2,
  [RolesEnum.ADMIN]: 9,
};
