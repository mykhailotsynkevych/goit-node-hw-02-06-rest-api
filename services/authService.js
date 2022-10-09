const User = require("../models/userModel");
const createError = require("../helpers/createError");
const bcrypt = require("bcryptjs");

const { jwtSecret } = require('../config');
const jwt = require('jsonwebtoken');

async function register(body) {
  const { email, password, subscription } = body;
  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "Email in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const result = await User.create({
    email,
    password: hash,
    subscription,
  });

  const { password: newUserPassword, ...newUser } = result.toObject();

  return newUser;
}

async function login(body) {
  const { email, password } = body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(401, "Email or password is wrong");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw createError(401, "Email or password is wrong");
  }

    const { password: existingUserPassword, subscription } = user.toObject();
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7 days' });

  return {
    user: { email, subscription },
    token,
  };
}

module.exports = {
  register,
  login,
};
