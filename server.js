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

app.get("/:userId/badges", async function (req, res) {

  try {
    const getUser = await submit(
      GetUserDetailsQuery(req.params.userId),
      BACKEND_URL
    );
    const getBadges = await submit(
      GetUserAllBadgeQuery(req.params.userId),
      BACKEND_URL
    )
    let images = ``;
    for (let i of await getBadges) {
      images = images.concat(`<img width="250" height="250" src="${i.badge_id_map.image}" />`);
    }
    const avatarImg = `<img width="100" class="avatar"  height="100" src="${await getUser[0].avatarUrl}" />`;
    const reactPlay = `<img width="70" height="70" src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1Ny40MzkiIGhlaWdodD0iNTUuMzQ0IiB2aWV3Qm94PSIwIDAgNTcuNDM5IDU1LjM0NCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM1OC42MjMgLTQuMjkxKSI+PHBhdGggZD0iTTE4LjgsMS44QTMzLjQ1LDMzLjQ1LDAsMCwwLDYuMjA3LDMuOTgzQzMuNDg5LDUuMTMxLDEuOCw2LjY0NywxLjgsNy45MzhzMS42ODksMi44MDcsNC40MDcsMy45NTVBMzMuNDUsMzMuNDUsMCwwLDAsMTguOCwxNC4wNzcsMzMuNDUsMzMuNDUsMCwwLDAsMzEuNCwxMS44OTNDMzQuMTE0LDEwLjc0NiwzNS44LDkuMjMsMzUuOCw3LjkzOFMzNC4xMTQsNS4xMzEsMzEuNCwzLjk4M0EzMy40NSwzMy40NSwwLDAsMCwxOC44LDEuOG0wLTEuOEMyOS4xODUsMCwzNy42LDMuNTU0LDM3LjYsNy45MzhzLTguNDE4LDcuOTM4LTE4LjgsNy45MzhTMCwxMi4zMjMsMCw3LjkzOCw4LjQxOCwwLDE4LjgsMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM4NC45MDggMTEuNzExKSByb3RhdGUoNjApIiBmaWxsPSIjMDBmMmZlIi8+PHBhdGggZD0iTTE4LjcyOSwxLjhBMzMuODg3LDMzLjg4NywwLDAsMCw2LjE3NSwzLjkzN0MzLjQ3Niw1LjA1NiwxLjgsNi41MjMsMS44LDcuNzY2czEuNjc2LDIuNzEsNC4zNzUsMy44MjlhMzMuODg3LDMzLjg4NywwLDAsMCwxMi41NTQsMi4xMzcsMzMuODg3LDMzLjg4NywwLDAsMCwxMi41NTQtMi4xMzdjMi43LTEuMTE5LDQuMzc1LTIuNTg2LDQuMzc1LTMuODI5cy0xLjY3Ni0yLjcxLTQuMzc1LTMuODI5QTMzLjg4NywzMy44ODcsMCwwLDAsMTguNzI5LDEuOG0wLTEuOEMyOS4wNzMsMCwzNy40NTksMy40NzcsMzcuNDU5LDcuNzY2cy04LjM4NSw3Ljc2Ni0xOC43MjksNy43NjZTMCwxMi4wNTUsMCw3Ljc2Niw4LjM4NSwwLDE4LjcyOSwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzY4LjA5IDI0LjEyNSkiIGZpbGw9IiMwMGYyZmUiLz48cGF0aCBkPSJNMTguOCwxLjhBMzMuNDUsMzMuNDUsMCwwLDAsNi4yMDcsMy45ODNDMy40ODksNS4xMzEsMS44LDYuNjQ3LDEuOCw3LjkzOHMxLjY4OSwyLjgwNyw0LjQwNywzLjk1NUEzMy40NSwzMy40NSwwLDAsMCwxOC44LDE0LjA3NywzMy40NSwzMy40NSwwLDAsMCwzMS40LDExLjg5M0MzNC4xMTQsMTAuNzQ2LDM1LjgsOS4yMywzNS44LDcuOTM4UzM0LjExNCw1LjEzMSwzMS40LDMuOTgzQTMzLjQ1LDMzLjQ1LDAsMCwwLDE4LjgsMS44bTAtMS44QzI5LjE4NSwwLDM3LjYsMy41NTQsMzcuNiw3LjkzOHMtOC40MTgsNy45MzgtMTguOCw3LjkzOFMwLDEyLjMyMywwLDcuOTM4LDguNDE4LDAsMTguOCwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAzLjcwOSAxOS42NDkpIHJvdGF0ZSgxMjApIiBmaWxsPSIjMDBmMmZlIi8+PHBhdGggZD0iTTIzLjkzOSwxMS4xNzFhMi40MTYsMi40MTYsMCwwLDEsNC4xMzMsMi4zNzVsLS4wMTYuMDQ0YTIuNDE2LDIuNDE2LDAsMCwwLDEuODYzLDMuMjI1bC4wOC4wMTNhMi40MTYsMi40MTYsMCwwLDEsMCw0Ljc2NWwtLjA4LjAxM2EyLjQxNiwyLjQxNiwwLDAsMC0xLjg2MywzLjIyNWwuMDE2LjA0NGEyLjQxNiwyLjQxNiwwLDAsMS00LjEzMywyLjM3NWgwYTIuNDE2LDIuNDE2LDAsMCwwLTMuNzM2LDBoMGEyLjQxNiwyLjQxNiwwLDAsMS00LjEzMy0yLjM3NWwuMDE2LS4wNDRhMi40MTYsMi40MTYsMCwwLDAtMS44NjMtMy4yMjVsLS4wOC0uMDEzYTIuNDE2LDIuNDE2LDAsMCwxLDAtNC43NjVsLjA4LS4wMTNhMi40MTYsMi40MTYsMCwwLDAsMS44NjMtMy4yMjVsLS4wMTYtLjA0NEEyLjQxNiwyLjQxNiwwLDAsMSwyMC4yLDExLjE3MWgwYTIuNDE2LDIuNDE2LDAsMCwwLDMuNzM2LDBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNzcuODMzIDQuMjkxKSByb3RhdGUoMzApIiBmaWxsPSIjMDBmMmZlIi8+PHBhdGggZD0iTTUuMTI4LDEuMTIyYTEsMSwwLDAsMSwxLjYyMSwwbDMuOTgzLDUuNTE1YTEsMSwwLDAsMS0uODExLDEuNTg1SDEuOTU2YTEsMSwwLDAsMS0uODExLTEuNTg1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzkyLjc1OCAyNS41MzUpIHJvdGF0ZSg5MCkiIGZpbGw9IiMwMTAzMjYiLz48L2c+PC9zdmc+'/>`;
    const image = await nodeHtmlToImage({
      html: `<html>
      <style>
      body{
        width:800px;
        padding: 1rem 2rem;
        background:#010326;
        color:#ffffff;
      }
      .avatar{
        border-radius:20%
      }     
      .userInfo{
        display:flex;
        justify-content: center;
        gap:1rem;
        }
      .logo{
        display:flex;
        justify-content: space-between;
      }
      .badgeText{
        text-align:center;
        color:#00f2fe;
        font-size:1.5rem;
        margin-top:1rem;
        text-decoration:underline #00f2fe solid;
      }
      .imgContainer{
        display:flex;
        justify-content: center;
      }
      .name{
        color:#00f2fe;
        font-size:3rem;
        margin-top:0;  
        margin-bottom:0;         
      }
      .reactPlayTitle{
        color:#00f2fe;
        font-size:2rem;   
        margin-top:0.5rem;  
        margin-bottom:0;  
      }
      .email{
        margin-top:0.2rem;
        font-size:1.5rem;      
      }
     
      </style>
      <body>
      <div>
        <div class="logo">
          ${reactPlay}
          <p class="reactPlayTitle">React Play</p> 
        </div>        
        <div class="userInfo">
        <div>          
        <p class="name">${await getUser[0].displayName}</p> 
        <p class="email">${await getUser[0].email}</p>           
        </div>
        <div>
          ${avatarImg}
        </div>  
        </div>
        <div>
          <p class="badgeText">Badges</p>
        </div>
        <div class="imgContainer">
           ${images}  
        </div>
       <div>    
      </body>  
      </html>`,

    });
    res.writeHead(200, {
      'Content-Type': 'image/base-64'
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
