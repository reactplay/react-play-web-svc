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
Screenshot();

module.exports.Screenshot = Screenshot;
