import * as Joi from "joi";
import { errorResponseSchema, parentParamSchema } from "@/common/validators";

export const practiceIdParamsSchema = parentParamSchema.append({
  practice_id: Joi.string()
    .required()
    .error(() => "practice_id is required"),
});

export const practiceBasicSchema = Joi.object({
  p__code: Joi.string().required().min(3),
  p__answers: Joi.array().items(Joi.string()).min(2).required(),
  p__right_answer: Joi.number().required(),
  p__details: Joi.string().optional(),
});

export const practiceObjectSchema = practiceBasicSchema.append({
  id: Joi.string().required(),
});

export const practicePostResponseSchema = Joi.alternatives().try(
  practiceObjectSchema,
  errorResponseSchema
);
