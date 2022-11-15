const HealthCheck = (req, res) => {
  console.log("Received HealthCheck request");
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>ReactPlay web service is <b>Healthy</b></h1>");
  res.end();
};

const BaseRoute = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(
    '<div style="display:flex;width:100%;height:100vh;justify-content:center;align-items:center;background:#010326"><div stle="flex:1"><span style="font-size:2rem;color:#FFFFFF">Welcome to <b><a href="https://reactplay.io" target="_blnk">ReactPlay</a> Web Service</b></span></div></div>'
  );
  res.end();
};

module.exports.HealthCheck = HealthCheck;
module.exports.BaseRoute = BaseRoute;
