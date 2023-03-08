import * as Joi from "joi";
import { isValidObjectId } from "@/common/helpers";

export const roleParamsSchema = Joi.object({
  roleId: Joi.string().required().custom(isValidObjectId),
});

export const roleRequestSchema = Joi.object({
  name: Joi.string().required(),
  access_level: Joi.number().required(),
});
