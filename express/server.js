const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const {
  UpdateHackRPlayBadges,
} = require("../models/badges/hack-r-play-2022.js");
const { sendMail } = require("../services/email/index.js");
const { email2Slug } = require("../services/util/string.js");
const os = require("os");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const path = require("path");

// Configuration
var app = express();
const router = express.Router();

// Initialization
if (process.env.SERVER_PORT) {
  app.set("port", process.env.SERVER_PORT);
}

const BACKEND_URL = `${process.env.NHOST_BACKEND_URL}/${process.env.NHOST_VERSION}/${process.env.NHOST_ENDPOINT}`;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

console.log(SENDGRID_API_KEY);

router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(
    '<div style="display:flex;width:100%;height:100vh;justify-content:center;align-items:center;background:#010326"><div stle="flex:1"><span style="font-size:2rem;color:#FFFFFF">Welcome to <b><a href="https://reactplay.io" target="_blnk">ReactPlay</a> Web Service</b></span></div></div>'
  );
  res.end();
});

router.get("/hc", function (req, res) {
  console.log("Received HealthCheck request");
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>ReactPlay web service is <b>Healthy</b></h1>");
  res.end();
});

router.post("/badges", function (req, res) {
  console.log("Received request to update badges");
  res.writeHead(200, { "Content-Type": "application/json" });
  UpdateHackRPlayBadges(BACKEND_URL, SENDGRID_API_KEY).then((result) => {
    var response = {
      response: "Successfully updated badges.",
    };
    console.log(response);
    res.end(JSON.stringify(result));
  });
});

// router.post("/mail", function (req, res) {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   sendMail(SENDGRID_API_KEY, email2slug("koustov@live.com"));
//   var response = {
//     response: "Successfully sent email.",
//   };
//   console.log(response);
//   res.end(JSON.stringify({ result: "done" }));
// });

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
