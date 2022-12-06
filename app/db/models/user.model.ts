import { Schema, model } from "mongoose";
import {
  userNameMinLength,
  userNameMaxLength,
  userEmailValidateRegexp,
  userEmailMessage,
  userPasswordMinLength,
} from "@/common/constants";
import { RolesEnum } from "../../common/enums";

export const userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
      minLength: userNameMinLength,
      maxLength: userNameMaxLength,
    },
    user_email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (str: string) => userEmailValidateRegexp.test(str),
        message: userEmailMessage,
      },
    },
    user_password: {
      type: String,
      required: true,
      minLength: userPasswordMinLength,
    },
    user_role: {
      type: String,
      required: true,
      enum: [...Object.values(RolesEnum)],
      default: RolesEnum.USER,
    },
  },
  { versionKey: false }
);

export const userModel = model("user", userSchema);
