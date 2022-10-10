const express = require("express");
const userRouter = express.Router();

const {
  register,
  login,
  logout,
  current,
} = require("../.././services/authService");
const checkAuth = require("../.././middlewares/checkAuth");

const {
  registerSchema,
  loginSchema,
} = require("../../schemas/auth-validation");

userRouter.post("/register", async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      res
        .status(400)
        .json({ message: "Помилка від Joi або іншої бібліотеки валідації" });
    }

    const user = await register(req.body);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      res
        .status(400)
        .json({ message: "Помилка від Joi або іншої бібліотеки валідації" });
    }

    const result = await login(req.body);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/logout", checkAuth, async (req, res, next) => {
  try {
    const { user } = req;
    await logout(user.id);

    res.status(204).json({ message: "No Content" });
  } catch (error) {
    next(error);
  }
});

userRouter.get("/current", checkAuth, async (req, res, next) => {
  try {
    const user = await current(req.body);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
