import * as Joi from "joi";
import { parentParamSchema } from "@/common/validators";
import { isValidObjectId } from "@/common/helpers";

export const quizIdParamsSchema = parentParamSchema.append({
  quiz_id: Joi.string().required().custom(isValidObjectId),
});

export const quizCreateSchema = Joi.object({
  tasks_limit: Joi.number().required(),
  questions_limit: Joi.number(),
});

export const quizUpdateSchema = Joi.object({
  override_answers: Joi.boolean().required(),
  right: Joi.array().items(Joi.string()).required(),
  wrong: Joi.array().items(Joi.string()),
});
