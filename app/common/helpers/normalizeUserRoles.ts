import { IRole } from "../interfaces/IRole";

export const normalizeUserRoles = (users: IRole[]) => {
  const rolesObject: Record<string, number> = {};
  users.forEach((role) => {
    rolesObject[role.name] = role.access_level;
  });
  return rolesObject;
};
