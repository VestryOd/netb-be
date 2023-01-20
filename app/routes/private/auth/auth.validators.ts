import Joi = require("joi");
import { userPasswordMinLength } from "@/common/constants";

export const authBodyValidator = Joi.object({
  user_email: Joi.string().required().email(),
  user_password: Joi.string().required().min(userPasswordMinLength),
});
