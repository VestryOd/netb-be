import { IUser } from "../interfaces/IUser";

export const userToResponse = (user: IUser): Omit<IUser, "user_password"> => {
  const { user_name, user_email, user_role, id } = user;
  return { user_name, user_email, user_role, id };
};
