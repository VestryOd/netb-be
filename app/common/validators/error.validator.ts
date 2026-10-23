import * as Joi from "joi";

export const errorResponseSchema = Joi.object({
  message: Joi.string().required(),
  status: Joi.number().required(),
}).options({
  allowUnknown: true,
});
