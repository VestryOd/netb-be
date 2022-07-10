import * as Joi from "joi";
import { DisciplineEnum } from "@/common/enums";

const validDisciplines = Object.values(DisciplineEnum).join(", ");

export const parentParamSchema = Joi.object({
  discipline: Joi.string()
    .valid(...Object.values(DisciplineEnum))
    .required()
    .messages({
      "any.only": `This kind of discipline is unknown. Discipline could be one from these: ${validDisciplines}`,
    }),
});
