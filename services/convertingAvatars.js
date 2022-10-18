const Jimp = require('jimp');

const convertingAvatars = async ({ tempDir }) => {
  const image = await Jimp.read(tempDir);

  await image.cover(250, 250).writeAsync(tempDir);
};

module.exports = convertingAvatars;