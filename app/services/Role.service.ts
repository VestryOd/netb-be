import {
  getAllRoles,
  createRole,
  removeRole,
  getRoleByName,
} from "../db/role.db";
import { IRole } from "@/common/interfaces/IRole";
import { ALREADY_EXIST, NOT_FOUND } from "@/common/constants";

export class RoleService {
  public async getAllRoles() {
    return getAllRoles();
  }

  public async getRolesAccessLevelsMap() {
    const userRoles: IRole[] = await this.getAllRoles();

    const usersRolesAccessLevels: Record<string, number> = {};
    userRoles.forEach(({ name, access_level }) => {
      usersRolesAccessLevels[name] = access_level;
    });

    return usersRolesAccessLevels;
  }

  public async createRole(role: IRole) {
    const existingRole = await getRoleByName(role.name);

    if (existingRole) throw ALREADY_EXIST(`Role with name ${role.name}`);

    return createRole(role);
  }

  public async removeRole(roleId: string) {
    const removed = await removeRole(roleId);

    if (!removed) throw NOT_FOUND(roleId);
    return removed;
  }
}
