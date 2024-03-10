import { RolesEnum } from "../enums";

export const accessLevelByRole: Record<string, number> = {
  [RolesEnum.USER]: 0,
  [RolesEnum.STUDENT]: 1,
  [RolesEnum.TEACHER]: 2,
  [RolesEnum.ADMIN]: 9,
};

export const roleCreateMessage = (name: string) =>
  `Role with name ${name} was created`;

export const roleRemoveMessage = (roleId: string) =>
  `Role with id ${roleId} was deleted`;
