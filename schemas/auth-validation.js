const Joi = require("joi");
const { emailRegEx, passwordRegEx } = require("../constants");

const registerSchema = Joi.object({
  email: Joi.string().regex(emailRegEx).message("Not valid email").required(),
  password: Joi.string()
    .min(6)
    .max(20)
    .message("Not valid password")
    .required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().regex(emailRegEx).message("Not valid email").required(),
  password: Joi.string()
    .min(6)
    .max(20)
    .message("Not valid password")
    .required(),
});

module.exports = { registerSchema, loginSchema };
