const express = require("express");
const userRouter = express.Router();

// const fs = require("fs/promises");
// const path = require("path");

const { register, login, logout } = require("../.././services/authService");
const uploadAvatar = require("../.././services/userService");
const upload = require("../../middlewares/upload");
const checkAuth = require("../.././middlewares/checkAuth");

const {
  registerSchema,
  loginSchema,
} = require("../../schemas/auth-validation");

userRouter.post("/register", async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
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
      return res.status(400).json({ message: error.message });
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
    const { email, subscription } = req.user;

    res.status(200).json({ email, subscription });
  } catch (error) {
    next(error);
  }
});

userRouter.patch("/avatars", checkAuth, upload.single("image"), async (req, res, next) => {
  try {
    // console.log(req.body);
    // console.log(req.file);

    // const { path: temFilePath, originalname } = req.file;
    // const avatarsDir = path.join(__dirname, "../../public", "avatars", originalname);

    // await fs.rename(temFilePath, avatarsDir);

    const user = await uploadAvatar(req.user.id, req.file);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
