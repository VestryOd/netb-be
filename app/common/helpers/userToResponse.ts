import { IUser } from "../interfaces/IUser";

export const userToResponse = (user: IUser) => {
  const { user_name, user_email, user_role, id } = user;
  return { user_name, user_email, user_role, id };
};
