import { IUser } from "@/common/interfaces/IUser";
import { getByEmail, createUser, getOneById } from "../db/user.db";

export class UserService {
  public async getByEmail(email: string): Promise<IUser> {
    return await getByEmail(email);
  }

  async createUser(user: Omit<IUser, "id">) {
    return await createUser(user);
  }

  async getUserById(id: string) {
    return await getOneById(id);
  }
}
