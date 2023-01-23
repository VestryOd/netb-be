import { RolesEnum } from "../enums";

export const accessLevelByRole = {
  [RolesEnum.USER]: 1,
  [RolesEnum.TEACHER]: 2,
  [RolesEnum.ADMIN]: 9,
};
