import { IUser } from "@/common/interfaces/IUser";
import {
  getByEmail,
  createUser,
  getOneById,
  removeUser,
  updateUser,
  getAllUsers,
  updateUserRole,
} from "../db/user.db";
import { RolesEnum } from "@/common/enums";
import { ALREADY_EXIST, NOT_FOUND } from "@/common/constants";
import { userToResponse } from "@/common/helpers";

export class UserService {
  public async getAllUsers(): Promise<Omit<IUser, "user_password">[]> {
    const users = await getAllUsers();
    return users.map((user) => userToResponse(user));
  }
  public async getByEmail(email: string): Promise<IUser> {
    return await getByEmail(email);
  }

  async createUser(user: Partial<IUser>) {
    const candidate = await this.getByEmail(user.user_email);

    if (candidate) throw ALREADY_EXIST(`User with email ${user.user_email}`);
    const created = await createUser(user);
    return created ? userToResponse(created) : created;
  }

  async getUserById(id: string) {
    const user = await getOneById(id);
    if (!user) throw NOT_FOUND(id);
    return userToResponse(user);
  }

  async deleteUser(id: string) {
    const result = await removeUser(id);
    if (!result) throw NOT_FOUND(id);
    return result;
  }

  async updateOneUser(userId: string, user: IUser) {
    const updated = await updateUser(userId, user);
    if (!updated) throw NOT_FOUND(userId);
    return userToResponse(updated);
  }

  async updateUserRole(userId: string, role: RolesEnum) {
    const updated = await updateUserRole(userId, role);
    if (!updated) throw NOT_FOUND(userId);
    return userToResponse(updated);
  }
}
