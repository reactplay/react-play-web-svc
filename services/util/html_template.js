const HTMLTemplate = `<html>
      <style>
      * {
  font-family: sans-serif;
  padding: 0px;
  margin: 0px;
}

body {
  background-color: #212121;
  width: 800px;
  height: 400px;
}

.container {
  background-color: #ECEFF1;
  border-radius: 10px;
  overflow: hidden;
  display:flex;
  height:100%;
  width:100%;
  border: 6px solid #010326;
}

.svg-background {
  width: 100%;
  height: 400px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #010326;
  -webkit-clip-path: polygon(0 0, 4% 0, 38% 100%, 0% 100%);
  clip-path: polygon(0 0, 4% 0,38% 100%, 0% 100%);
}

.svg-background2 {
  width: 100%;
  height: 400px;
  position: absolute;
  top: 0;
  left: 20px;
  background-color: rgba(0,0,0,0.12);
  
  -webkit-clip-path: polygon(0 0, 4% 0, 38% 100%, 0% 100%);
  clip-path: polygon(0 0, 4% 0, 38% 100%, 0% 100%);
}

.profile-img {
  position:absolute;
  top:115;
  left:90;
  width: 150px;
  height: 150px;
  border-radius: 50%;

}

.circle {
  position: absolute;
  width: 160px;
  height: 160px;
  left: 0;
  top: 0;
  background-color: #ECEFF1;
  border-radius: 50%;
  margin-top: 110px;
  margin-left: 85px;
    box-shadow: 0px 0px 20px rgba(#151515, .15);
}

.text-container {
  position: absolute;
  right: 0;
  margin-right: 40px;
  margin-top: 45px;
  max-width: 500px;
  text-align: center;
  
}

.title-text {
  color: #555555;
  font-size: 32px;
  font-weight: 600;
  margin-top: 5px;
}

.info-text {
  margin-top: 10px;
  font-siize: 18px;
  opacity: 0.5;
}

.desc-text {
  font-size: 14px;
  margin-top: 10px;
}

.logo-image {
  position: absolute;
  color:#00f2fe;
  left:50;  
  top:320; 
  font-size: 14px
}
.logo-title {
  position: absolute;
  color:#00f2fe;
  left:120;  
  top:350; 
  font-size: 14px
}

.logo-contianer {
  position: absolute:
  top:0;
  left:0;
  margin-top: 100;
  margin-left: 20;
  z-index:99;
  display:flex;
}

.badges {
  position:absolute;
  display:flex;
  justify-content: center;
  height: 150px;
  left: 30%;
  top:30%;
  width:70%;
  padding-top:2rem;
  border-top: 2px solid #CDCDCD;
}
.badges>div {
  padding: 10px;
}

</style>
<body>
<div class="container">
  <div class="svg-background2"></div>
  <div class="svg-background"></div>
  <div class="circle"></div>
  <img class="profile-img" src="{{user_avatar}}">
  <div class="logo-container">
    <img class="logo-image" width="70" height="70" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1Ny40MzkiIGhlaWdodD0iNTUuMzQ0IiB2aWV3Qm94PSIwIDAgNTcuNDM5IDU1LjM0NCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM1OC42MjMgLTQuMjkxKSI+PHBhdGggZD0iTTE4LjgsMS44QTMzLjQ1LDMzLjQ1LDAsMCwwLDYuMjA3LDMuOTgzQzMuNDg5LDUuMTMxLDEuOCw2LjY0NywxLjgsNy45MzhzMS42ODksMi44MDcsNC40MDcsMy45NTVBMzMuNDUsMzMuNDUsMCwwLDAsMTguOCwxNC4wNzcsMzMuNDUsMzMuNDUsMCwwLDAsMzEuNCwxMS44OTNDMzQuMTE0LDEwLjc0NiwzNS44LDkuMjMsMzUuOCw3LjkzOFMzNC4xMTQsNS4xMzEsMzEuNCwzLjk4M0EzMy40NSwzMy40NSwwLDAsMCwxOC44LDEuOG0wLTEuOEMyOS4xODUsMCwzNy42LDMuNTU0LDM3LjYsNy45MzhzLTguNDE4LDcuOTM4LTE4LjgsNy45MzhTMCwxMi4zMjMsMCw3LjkzOCw4LjQxOCwwLDE4LjgsMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM4NC45MDggMTEuNzExKSByb3RhdGUoNjApIiBmaWxsPSIjMDBmMmZlIi8+PHBhdGggZD0iTTE4LjcyOSwxLjhBMzMuODg3LDMzLjg4NywwLDAsMCw2LjE3NSwzLjkzN0MzLjQ3Niw1LjA1NiwxLjgsNi41MjMsMS44LDcuNzY2czEuNjc2LDIuNzEsNC4zNzUsMy44MjlhMzMuODg3LDMzLjg4NywwLDAsMCwxMi41NTQsMi4xMzcsMzMuODg3LDMzLjg4NywwLDAsMCwxMi41NTQtMi4xMzdjMi43LTEuMTE5LDQuMzc1LTIuNTg2LDQuMzc1LTMuODI5cy0xLjY3Ni0yLjcxLTQuMzc1LTMuODI5QTMzLjg4NywzMy44ODcsMCwwLDAsMTguNzI5LDEuOG0wLTEuOEMyOS4wNzMsMCwzNy40NTksMy40NzcsMzcuNDU5LDcuNzY2cy04LjM4NSw3Ljc2Ni0xOC43MjksNy43NjZTMCwxMi4wNTUsMCw3Ljc2Niw4LjM4NSwwLDE4LjcyOSwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzY4LjA5IDI0LjEyNSkiIGZpbGw9IiMwMGYyZmUiLz48cGF0aCBkPSJNMTguOCwxLjhBMzMuNDUsMzMuNDUsMCwwLDAsNi4yMDcsMy45ODNDMy40ODksNS4xMzEsMS44LDYuNjQ3LDEuOCw3LjkzOHMxLjY4OSwyLjgwNyw0LjQwNywzLjk1NUEzMy40NSwzMy40NSwwLDAsMCwxOC44LDE0LjA3NywzMy40NSwzMy40NSwwLDAsMCwzMS40LDExLjg5M0MzNC4xMTQsMTAuNzQ2LDM1LjgsOS4yMywzNS44LDcuOTM4UzM0LjExNCw1LjEzMSwzMS40LDMuOTgzQTMzLjQ1LDMzLjQ1LDAsMCwwLDE4LjgsMS44bTAtMS44QzI5LjE4NSwwLDM3LjYsMy41NTQsMzcuNiw3LjkzOHMtOC40MTgsNy45MzgtMTguOCw3LjkzOFMwLDEyLjMyMywwLDcuOTM4LDguNDE4LDAsMTguOCwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAzLjcwOSAxOS42NDkpIHJvdGF0ZSgxMjApIiBmaWxsPSIjMDBmMmZlIi8+PHBhdGggZD0iTTIzLjkzOSwxMS4xNzFhMi40MTYsMi40MTYsMCwwLDEsNC4xMzMsMi4zNzVsLS4wMTYuMDQ0YTIuNDE2LDIuNDE2LDAsMCwwLDEuODYzLDMuMjI1bC4wOC4wMTNhMi40MTYsMi40MTYsMCwwLDEsMCw0Ljc2NWwtLjA4LjAxM2EyLjQxNiwyLjQxNiwwLDAsMC0xLjg2MywzLjIyNWwuMDE2LjA0NGEyLjQxNiwyLjQxNiwwLDAsMS00LjEzMywyLjM3NWgwYTIuNDE2LDIuNDE2LDAsMCwwLTMuNzM2LDBoMGEyLjQxNiwyLjQxNiwwLDAsMS00LjEzMy0yLjM3NWwuMDE2LS4wNDRhMi40MTYsMi40MTYsMCwwLDAtMS44NjMtMy4yMjVsLS4wOC0uMDEzYTIuNDE2LDIuNDE2LDAsMCwxLDAtNC43NjVsLjA4LS4wMTNhMi40MTYsMi40MTYsMCwwLDAsMS44NjMtMy4yMjVsLS4wMTYtLjA0NEEyLjQxNiwyLjQxNiwwLDAsMSwyMC4yLDExLjE3MWgwYTIuNDE2LDIuNDE2LDAsMCwwLDMuNzM2LDBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNzcuODMzIDQuMjkxKSByb3RhdGUoMzApIiBmaWxsPSIjMDBmMmZlIi8+PHBhdGggZD0iTTUuMTI4LDEuMTIyYTEsMSwwLDAsMSwxLjYyMSwwbDMuOTgzLDUuNTE1YTEsMSwwLDAsMS0uODExLDEuNTg1SDEuOTU2YTEsMSwwLDAsMS0uODExLTEuNTg1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzkyLjc1OCAyNS41MzUpIHJvdGF0ZSg5MCkiIGZpbGw9IiMwMTAzMjYiLz48L2c+PC9zdmc+"/>
    <div class="logo-title">React Play</div>
  </div>
  <div class="text-container">
    <p class="title-text">{{user_display_name}}</p>
    <p class="info-text">{{user_email}}</p>
    <p class="desc-text"></p>
  </div>
  <div class="badges">
  {{user_badges}}
  </div>
</div>
<body>`;

module.exports.HTMLTemplate = HTMLTemplate;
