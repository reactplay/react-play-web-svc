const axios = require("axios");

const graphqlRequest = async (endpoint, object, token) => {
  console.log("GraphQL request received");
  console.log(`Endpoint: ${endpoint}`);
  const headers = {
    "content-type": "application/json",
    Authorization: `bearer ${token}`,
  };
  const graphqlQuery = object;
  //   const graphqlQuery = {
  //     operationName: "fetchAuthor",
  //     query: `query fetchAuthor { author { id name } }`,
  //     variables: {},
  //   };

  return axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: graphqlQuery,
  }).then((res) => {
    return res.data;
  });
};

module.exports.graphqlRequest = graphqlRequest;
