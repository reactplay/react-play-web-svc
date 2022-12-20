const { getResult } = require("../../services/request/git");
const { GetPublishedPlays } = require("../plays/published");

const PublishedPlays = (req, res) => {
  console.log("Received request to get published plays");
  res.writeHead(200, { "Content-Type": "application/json" });
  GetPublishedPlays(req, res).then((result) => {
    var response = {
      response: "Successfully received published play info.",
    };
    console.log("Received result");
    console.log(response);
    res.end(JSON.stringify(result));
  });
};

const GetGitResult = (req, res) => {
  console.log("Received request to get published plays");
  res.writeHead(200, { "Content-Type": "application/json" });
  getResult(req, res).then((result) => {
    var response = {
      response: "Successfully updated badges.",
    };
    console.log(response);
    res.end(JSON.stringify(result));
  });
};

module.exports.PublishedPlays = PublishedPlays;
module.exports.GetGitResult = GetGitResult;
