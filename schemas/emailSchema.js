const Joi = require('joi');
const { emailRegEx } = require('../constants');

const emailSchema = Joi.object({
    email: Joi.string()
        .regex(emailRegEx)
        .message('Помилка від Joi або іншої бібліотеки валідації')
        .required(),
});

module.exports = emailSchema;