const puppeteer = require("puppeteer"); // Require Puppeteer moduleconst url = "https://www.testim.io/"; // Set website you want to screenshot
const url = "https://www.testim.io/"; // Set website you want to screenshot

const Screenshot = async () => {
  // Define Screenshot function
  console.log("Inside Screenshot");
  const browser = await puppeteer.launch(); // Launch a "browser"
  const page = await browser.newPage(); // Open new page
  await page.goto(url); // Go website
  await page.waitForSelector("#header > div > div > a.h-logo"); // Method to ensure that the element is loaded
  const logo = await page.$("#header > div > div > a.h-logo"); // logo is the element you want to capture
  await logo.screenshot({
    path: "testim.png",
  });
  const base64 = await page.screenshot({ encoding: "base64" });
  console.log("Result obtained");
  await page.close(); // Close the website
  await browser.close(); // Close the browser
  return base64;
};

const ScreenCapture = async () => {
  const PCR = require("puppeteer-chromium-resolver");
  const puppeteer = require("puppeteer");
  //update global env
  process.env.PUPPETEER_EXECUTABLE_PATH = stats.executablePath;
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
  const page = await browser.newPage();
  await page.goto("https://www.npmjs.com/package/puppeteer-chromium-resolver");
  const base64 = await page.screenshot({ encoding: "base64" });
  console.log("Result obtained");
  await page.close(); // Close the website
  await browser.close(); // Close the browser
  return base64;
};

module.exports.Screenshot = Screenshot;
module.exports.ScreenCapture = ScreenCapture;
