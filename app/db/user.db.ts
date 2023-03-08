import * as bcrypt from "bcrypt";
import { UserModel, RoleModel } from "./models";
import { IUser } from "@/common/interfaces/IUser";
import { RolesEnum } from "@/common/enums";

const getHashedPassword = async (user_password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(user_password, salt);
};

export const getAllUsers = async () => {
  return UserModel.find({});
};

export const getByEmail = async (user_email: string) =>
  await UserModel.findOne({ user_email });

export const createUser = async (user: Partial<IUser>): Promise<IUser> => {
  const { user_password } = user;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user_password, salt);
  const newUser = new UserModel({
    ...user,
    user_password: hash,
  });
  await newUser.save();
  return newUser;
};

export const getOneById = async (id: string) => await UserModel.findById(id);

export const removeUser = async (userId: string) => {
  const user = await UserModel.findById(userId);

  if (!user) return null;

  await user.remove();
  return userId;
};

export const updateUser = async (userId: string, user: IUser) => {
  const existingUser = await UserModel.findById(userId);

  if (!existingUser) return null;

  for (const [key, value] of Object.entries(user)) {
    if (key) {
      existingUser[key] =
        key === "user_password" ? await getHashedPassword(value) : value;
    }
  }
  await existingUser.save();
  return existingUser;
};

export const updateUserRole = async (userId: string, role: RolesEnum) => {
  const existingUser = await UserModel.findById(userId);

  if (!existingUser) return null;
  const [{ name }] = await RoleModel.find({ name: role });

  existingUser.user_role = name;

  existingUser.save();
  return existingUser;
};
