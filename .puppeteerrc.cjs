const { join } = require("path");

console.log("The dir path is : ", __dirname);
/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: "/home/sbx_user1051/.cache/puppeteer", //join(__dirname, ".cache", "puppeteer"),
  experiments: {
    macArmChromiumEnabled: true,
  },
};
