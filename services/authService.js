const User = require("../models/userModel");
const createError = require("../helpers/createError");
const bcrypt = require("bcryptjs");

const { jwtSecret } = require("../config");
const jwt = require("jsonwebtoken");

var gravatar = require('gravatar');

async function register(body) {
  const { email, password, subscription} = body;
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
    avatarURL: gravatar.url(email, {protocol: 'http', s: '100'}),
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
  const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "7 days" });
  await User.findByIdAndUpdate(user._id, { token }, { new: true });

  return {
    user: { email, subscription },
    token,
  };
}

async function logout(id) {
  await User.findByIdAndUpdate(id, { token: "" });
}

module.exports = {
  register,
  login,
  logout,
};
