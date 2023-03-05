import { Schema, model } from "mongoose";
import {
  userNameMinLength,
  userNameMaxLength,
  userEmailValidateRegexp,
  userEmailMessage,
  userPasswordMinLength,
  SchemaNames,
} from "@/common/constants";

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
      type: Schema.Types.ObjectId,
      ref: SchemaNames.Role,
      required: true,
    },
  },
  { versionKey: false }
);
export const userModel = model(SchemaNames.User, userSchema);
