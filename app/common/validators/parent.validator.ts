import * as Joi from "joi";

export const parentParamSchema = Joi.object({
  discipline: Joi.string().required(),
});
