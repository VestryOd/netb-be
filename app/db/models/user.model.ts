import { Schema, model } from "mongoose";
import {
  userNameMinLength,
  userNameMaxLength,
  userEmailValidateRegexp,
  userEmailMessage,
  userPasswordMinLength,
  SchemaNames,
} from "@/common/constants";
import { RolesEnum } from "@/common/enums";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         user_name:
 *           type: string
 *           example: John Dou
 *           minLength: 5
 *           maxLength: 100
 *         user_email:
 *           type: string
 *           format: email
 *           example: john@email.com
 *           pattern: '/^[\w_.]+@([\w-]+\.)+[\w-]{2,4}$/'
 *         user_password:
 *           type: string
 *           format: password
 *           minLength: 6
 *         user_role:
 *           $ref: '#/components/schemas/RoleTypes'
 *           default: user
 *       required:
 *         - user_name
 *         - user_email
 *         - user_password
 *         - user_role
 */
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
      index: true,
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
      default: RolesEnum.USER,
      required: true,
    },
  },
  { versionKey: false }
);
export const UserModel = model(SchemaNames.User, userSchema);
