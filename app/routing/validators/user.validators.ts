import * as Joi from "joi";
import {
  userNameMaxLength,
  userNameMinLength,
  userPasswordMinLength,
} from "@/common/constants";
import { RolesEnum } from "@/common/enums";
import { errorResponseSchema } from "@/common/validators";
import { isValidObjectId } from "@/common/helpers";

export const userBasicSchema = Joi.object({
  user_name: Joi.string()
    .required()
    .min(userNameMinLength)
    .max(userNameMaxLength),
  user_email: Joi.string().required().email(),
});

export const userParamsSchema = Joi.object({
  userId: Joi.string().required().custom(isValidObjectId),
});

export const userRoleRequestSchema = Joi.object({
  user_role: Joi.string()
    .required()
    .valid(...Object.values(RolesEnum)),
});

export const userRequestSchema = userBasicSchema.append({
  user_password: Joi.string().required().min(userPasswordMinLength),
});

export const userResponseSchema = userBasicSchema.append({
  id: Joi.string().required(),
});

export const userPostResponse = Joi.alternatives().try(
  userResponseSchema,
  errorResponseSchema
);
