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
const { UpdateBadges, MetaImage } = require("../models/routes/badges.js");
const { HealthCheck, BaseRoute } = require("../models/routes/base.js");

// Configuration
var app = express();
const router = express.Router();

// Initialization
if (process.env.SERVER_PORT) {
  app.set("port", process.env.SERVER_PORT);
}

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

console.log(SENDGRID_API_KEY);

router.get("/", (req, res) => {
  BaseRoute(req, res);
});

router.get("/hc", function (req, res) {
  HealthCheck(req, res);
});

router.post("/badges", function (req, res) {
  UpdateBadges(req, res);
});

router.get("/:userId/badges", async function (req, res) {
  MetaImage(req, res);
});

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
