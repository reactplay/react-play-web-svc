const { getPublishedPlays } = require("../../services/request/git");

const GetPublishedPlays = async (req, res) => {
  console.log("Request received to get all published playes");
  return getPublishedPlays(req, res);
};

module.exports.GetPublishedPlays = GetPublishedPlays;
