const express = require("express");
const userRouter = express.Router();

const { register} = require('../.././services/authService');

const {
  registerSchema,
  loginSchema,
} = require("../.././schemas/register-validation");

userRouter.post("/register", async (req, res, next) => {
    try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: "Помилка від Joi або іншої бібліотеки валідації" });
    }
    // validateSchema(registerSchema, req.body);

    const user = await register(req.body);
    // const { password, ...user } = result.toObject();

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    validateSchema(loginSchema, req.body);

    const result = await login(req.body);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
