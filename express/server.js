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

// Configuration
var app = express();

// Initialization
if (process.env.SERVER_PORT) {
  app.set("port", process.env.SERVER_PORT);
}

app.use(bodyParser.json());

const BACKEND_URL = `${process.env.NHOST_BACKEND_URL}/${process.env.NHOST_VERSION}/${process.env.NHOST_ENDPOINT}`;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

console.log(SENDGRID_API_KEY);

app.get("/hc", function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello from Express.js!</h1>");
  res.end();
});

app.post("/badges", function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  UpdateHackRPlayBadges(BACKEND_URL, SENDGRID_API_KEY).then((result) => {
    var response = {
      response: "Successfully updated badges.",
    };
    console.log(response);
    res.end(JSON.stringify(result));
  });
});

app.post("/mail", function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  sendMail(SENDGRID_API_KEY, email2slug("koustov@live.com"));
  var response = {
    response: "Successfully sent email.",
  };
  console.log(response);
  res.end(JSON.stringify({ result: "done" }));
});

// var server = app.listen(app.get("port"), function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log(
//     `ReactPlay Web Service is running on  https://${os.hostname()}:${port}`
//   );
// });

// export default serverless(app);
module.exports = app;
module.exports.handler = serverless(app);
