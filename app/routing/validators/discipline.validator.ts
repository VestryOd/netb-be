import * as Joi from "joi";
import { isValidObjectId } from "@/common/helpers";

export const disciplineParamsSchema = Joi.object({
  disciplineId: Joi.string().required().custom(isValidObjectId),
});

export const disciplineRequestSchema = Joi.object({
  name: Joi.string().required(),
});
