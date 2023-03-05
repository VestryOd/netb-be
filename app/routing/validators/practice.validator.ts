import * as Joi from "joi";
import { parentParamSchema } from "@/common/validators";
import { PracticeTypeEnum } from "@/common/enums/PracticeTypeEnum";

export const practiceIdParamsSchema = parentParamSchema.append({
  practice_id: Joi.string()
    .required()
    .error(() => "practice_id is required"),
});

export const practiceBasicSchema = Joi.object({
  type: Joi.string()
    .required()
    .valid(...Object.values(PracticeTypeEnum)),
  // discipline: Joi.string().required(),
  code: Joi.string().required().min(3),
  answers: Joi.array().items(Joi.string()).min(2).required(),
  right_answer: Joi.array().items(Joi.number()).required(),
  details: Joi.string().optional(),
  created_by: Joi.string().required(),
});
