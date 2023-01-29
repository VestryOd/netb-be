import * as bcrypt from "bcrypt";
import { userModel } from "./models";
import { IUser } from "@/common/interfaces/IUser";
import { ALREADY_EXIST } from "@/common/constants";
import { RolesEnum } from "../common/enums";

export const getAllUsers = async () => await userModel.find({});

export const getByEmail = async (user_email: string) =>
  await userModel.findOne({ user_email });

export const createUser = async (user: Partial<IUser>): Promise<IUser> => {
  const { user_password, user_email } = user;

  const candidate = await getByEmail(user_email);

  if (candidate) throw ALREADY_EXIST(`User with mail ${user_email}`);

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user_password, salt);
  const newUser = new userModel({ ...user, user_password: hash });
  await newUser.save();
  return newUser;
};

export const getOneById = async (id: string) => await userModel.findById(id);

export const removeUser = async (id: string) => {
  const user = await userModel.findById(id);

  if (!user) return null;

  await user.remove();
  return user;
};

export const updateUser = async (userId: string, user: IUser) => {
  const existingUser = await userModel.findById(userId);

  if (!existingUser) return null;

  Object.entries(user).forEach(([key, value]) => {
    if (key) {
      existingUser[key] = value;
    }
  });
  existingUser.save();
  return existingUser;
};

export const updateUserRole = async (userId: string, role: RolesEnum) => {
  const existingUser = await userModel.findById(userId);

  if (!existingUser) return null;

  existingUser.user_role = role;

  existingUser.save();
  return existingUser;
};
