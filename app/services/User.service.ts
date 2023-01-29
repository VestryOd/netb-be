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
import { RolesEnum } from "../common/enums";

export class UserService {
  public async getAllUsers(): Promise<IUser[]> {
    return getAllUsers();
  }
  public async getByEmail(email: string): Promise<IUser> {
    return await getByEmail(email);
  }

  async createUser(user: Partial<IUser>) {
    return await createUser(user);
  }

  async getUserById(id: string) {
    return await getOneById(id);
  }

  async deleteUser(id: string) {
    return await removeUser(id);
  }

  async updateOneUser(userId: string, user: IUser) {
    return await updateUser(userId, user);
  }

  async updateUserRole(userId: string, role: RolesEnum) {
    return await updateUserRole(userId, role);
  }
}
