const User = require("../models/userModel");
const createError = require("../helpers/createError");
const bcrypt = require("bcryptjs");

const { jwtSecret } = require("../config");
const jwt = require("jsonwebtoken");

var gravatar = require("gravatar");

const sendEmail = require("../helpers/sendEmail");
const { v4: uuid } = require("uuid");

async function register(body) {
  const { email, password, subscription } = body;
  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "Email in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const verificationToken = uuid();

  const result = await User.create({
    email,
    password: hash,
    subscription,
    avatarURL: gravatar.url(email, { protocol: "http", s: "100" }),
    verificationToken,
  });

  sendEmail({
    to: email,
    subject: "Confirm Email",
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}">Confirm Email</a>`,
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

  if (!user.verified) {
    throw createError(401, "Email not verified");
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

async function confirmEmail(verificationToken) {
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw createError(404, "User not found");
  }

  if (user.verified) {
    throw createError(400, "Already verified");
  }

  await User.findByIdAndUpdate(user.id, {
    verificationToken: null,
    verify: true,
  });
}

async function resendEmail(email) {
    const user = await User.findOne({ email });

    if (!user) {
        throw createError(400, 'missing required field email');
    }

    if (user.verify) {
        throw createError(400, 'Verification has already been passed');
    }

    sendEmail({
        to: email,
        subject: 'Confirm Email',
        html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}">Confirm Email</a>`,
    });
}

module.exports = {
  register,
  login,
  logout,
  confirmEmail,
  resendEmail,
};
