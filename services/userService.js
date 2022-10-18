const User = require("../models/userModel");
const path = require("path");
const fs = require("fs/promises");

const convertingAvatars = require('./convertingAvatars');

async function uploadAvatar(id, data) {
    const { path: tempDir, originalname = ""} = data;
    
  const extension = originalname.split('.').reverse()[0];
//   const [extension] = originalname.split(".").reverse();
    
  const newFileName = `${id}.${extension}`;
  const uploadDir = path.join(
    __dirname,
    "../",
    "public",
    "avatars",
    newFileName
  );

  await convertingAvatars({ tempDir });

  await fs.rename(tempDir, uploadDir);

  const user = await User.findByIdAndUpdate(
    id,
    { avatarURL: path.join("avatars", newFileName) },
    { new: true }
  );

  const { password, token, ...result } = user.toObject();

  return result;
}

module.exports = uploadAvatar;
