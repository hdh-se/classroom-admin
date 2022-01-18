const withImages = require('next-images');

module.exports = {
  reactStrictMode: true,
  distDir: 'build',
  withImages: withImages(),
  env: {
    MAIN_URL: process.env.MAIN_URL,
  },
};
