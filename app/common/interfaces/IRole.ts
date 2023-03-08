import { RolesEnum } from "../enums";

export interface IRole {
  _id?: string;
  name: RolesEnum;
  access_level: number;
}
