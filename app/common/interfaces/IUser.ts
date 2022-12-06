import { RolesEnum } from "../enums";

export interface IUser {
  id: string;
  user_name: string;
  user_email: string;
  user_password: string;
  user_role: RolesEnum;
}
