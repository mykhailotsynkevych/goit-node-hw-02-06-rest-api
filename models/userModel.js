const { Schema, model } = require("mongoose");
const { emailRegEx, passwordRegEx } = require("../constants");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [emailRegEx, "Not valid email"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      match: [passwordRegEx, "Not valid password"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: String,
    
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = model("users", userSchema);

module.exports = User;
