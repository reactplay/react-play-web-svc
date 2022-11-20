const puppeteer = require("puppeteer");
const PCR = require("puppeteer-chromium-resolver");

const TakeScreenShot = async () => {
  const option = {
    revision: "",
    detectionPath: "",
    folderName: ".chromium-browser-snapshots",
    defaultHosts: [
      "https://storage.googleapis.com",
      "https://npm.taobao.org/mirrors",
    ],
    hosts: [],
    cacheRevisions: 2,
    retry: 3,
    silent: false,
  };
  const stats = await PCR(option);
  const browser = await stats.puppeteer
    .launch({
      headless: false,
      args: ["--no-sandbox"],
      executablePath: stats.executablePath,
    })
    .catch(function (error) {
      console.log(error);
    });

  // const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.freecodecamp.org/");
  const base64 = await page.screenshot({ encoding: "base64" });
  console.log(base64);
  await browser.close();
};

module.exports.TakeScreenShot = TakeScreenShot;
