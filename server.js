import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { UpdateHackRPlayBadges } from "./models/badges/hack-r-play-2022.js";
import { sendMail } from "./services/email/index.js";
import string from "react-play-pk";
import nodeHtmlToImage from "node-html-to-image";
import { submit } from './services/submit.js';
import { GetUserAllBadgeQuery, GetUserDetailsQuery } from './models/badges/queries.js';



// Configuration
var app = express();

// Initialization
if (process.env.SERVER_PORT) {
  app.set("port", process.env.SERVER_PORT);
}

const BACKEND_URL = `${process.env.NHOST_BACKEND_URL}/${process.env.NHOST_VERSION}/${process.env.NHOST_ENDPOINT}`;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

console.log(SENDGRID_API_KEY);

app.get("/", function (req, res) {
  console.log("Healthcheck running");
  res.sendStatus(200);
});

app.get("/user/badges", async function (req, res) {

  try {
    const getUser = await submit(
      GetUserDetailsQuery("4fa14525-8f98-45b9-9a8b-c1ba34c6ed43"),
      BACKEND_URL
    );
    const getBadges = await submit(
      GetUserAllBadgeQuery("4fa14525-8f98-45b9-9a8b-c1ba34c6ed43"),
      BACKEND_URL
    )
    let images = ``;
    for (let i of await getBadges) {
      images = images.concat(`<img width="50" height="50" src="${i.badge_id_map.image}" />`);
    }

    const image = await nodeHtmlToImage({
      html: `<html>
      <style>
      body{
        width:500px;
        height:300px;
      }
      </style>
      <body>
      <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>      
      <p>${await getUser[0].displayName}</p>
      ${images}      
      </body>  
      </html>`,

    });
    res.writeHead(200, {
      'Content-Type': 'image/png'
    })
    res.end(image, 'base64');
  } catch (e) {
    res.end("Something went wrong");
  }

})

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
  sendMail(SENDGRID_API_KEY, string.email2slug("koustov@live.com"));
  var response = {
    response: "Successfully sent email.",
  };
  console.log(response);
  res.end(JSON.stringify({ result: "done" }));
});

var server = app.listen(app.get("port"), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("ReactPlay Web Service is running on  http://%s:%s", host, port);
});
