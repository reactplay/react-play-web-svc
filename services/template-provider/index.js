const puppeteer = require("puppeteer");

const TakeScreenShot = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.freecodecamp.org/");
  const base64 = await page.screenshot({ encoding: "base64" });
  console.log(base64);
  await browser.close();
};

module.exports.TakeScreenShot = TakeScreenShot;
