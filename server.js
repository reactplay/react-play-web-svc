import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { UpdateHackRPlayBadges } from "./models/badges/hack-r-play-2022.js";

// Configuration
var app = express();

// Initialization
app.set("port", process.env.SERVER_PORT || 4000);

const BACKEND_URL = `${process.env.NHOST_BACKEND_URL}/${process.env.NHOST_VERSION}/${process.env.NHOST_ENDPOINT}`;
console.log(BACKEND_URL);

app.get("/", function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  var response = { response: "The ReactPlay web service is running" };
  console.log(response);
  res.end(JSON.stringify(response));
});

app.post("/badges", function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  UpdateHackRPlayBadges(BACKEND_URL).then((result) => {
    var response = {
      response: "Successfully updated badges.",
    };
    console.log(response);
    res.end(JSON.stringify(response));
  });
});

var server = app.listen(app.get("port"), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("ReactPlay Web Service is running on  http://%s:%s", host, port);
});
