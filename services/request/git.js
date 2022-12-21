const dotenv = require("dotenv");
const { graphqlRequest } = require("./get");
dotenv.config();
const GITHUB_GRAPHQL_ENDPOINT = process.env.GITHUB_GRAPHQL_ENDPOINT;
const GITHUB_PAT = process.env.GITHUB_PAT;

const getPublishedPlays = (req, res) => {
  return graphqlRequest(
    GITHUB_GRAPHQL_ENDPOINT,
    {
      operationName: "ListFiles",
      query: `query ListFiles { repository(owner: "reactplay", name: "react-play") {
          object(expression: "main:src/plays") {
            ... on Tree {
              entries {
                name
                type
              }
            }
          }
        } }`,
      variables: {},
    },
    GITHUB_PAT
  )
    .then((res) => {
      const data = res?.data?.repository?.object?.entries;
      if (data) {
        return data.map((d) => d.name);
      } else {
        return [];
      }
    })
    .catch((error) => {
      throw error;
    });
};

const getResult = (req, res) => {
  return graphqlRequest(GITHUB_GRAPHQL_ENDPOINT, req.body);
};

module.exports.getPublishedPlays = getPublishedPlays;
module.exports.getResult = getResult;
