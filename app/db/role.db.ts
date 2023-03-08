import { RoleModel } from "./models";
import { IRole } from "@/common/interfaces/IRole";

export const createRole = ({ name, access_level }: IRole): Promise<IRole> => {
  return RoleModel.create({ name, access_level });
};

export const removeRole = async (roleId: string) => {
  const existingRole = await RoleModel.findById(roleId);

  if (!existingRole) return null;

  existingRole.remove(roleId);
  return { id: roleId };
};

export const getAllRoles = () => {
  return RoleModel.find();
};

export const getRoleByName = (name: string) => {
  return RoleModel.findOne({ name });
};
