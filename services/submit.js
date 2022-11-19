const dotenv = require("dotenv");
dotenv.config();

const BACKEND_URL = `${process.env.NHOST_BACKEND_URL}/${process.env.NHOST_VERSION}/${process.env.NHOST_ENDPOINT}`;

/**
 * Run GraphQL queries using Axios using multiple  JSON object
 * @param {object[]} requests           Mandatory.
 * @param {string}           url Optional.
 * @param {object}           reqheder Optional.
 */
const gsubmit_multi = async (requests, url, reqheder) => {
  const json_gql = await import("json-graphql-parser/v2/index.js");
  return json_gql.submit_multi(requests, BACKEND_URL);
};

/**
 * Run GraphQL queries using Axios using a simple JSON object
 * @param {object} request           Mandatory.
 * @param {string}           url Optional.
 * @param {object}           reqheder Optional.
 * @returns {Promise} single promise
 */
const gsubmit = async (request, url, reqheder) => {
  const json_gql = await import("json-graphql-parser/v2/index.js");
  return json_gql.submit(request, BACKEND_URL, undefined, false);
};

const submitMutation = (query, object) => {
  const mutationQuery = query;
  mutationQuery.object = object;
  return gsubmit(mutationQuery);
};

module.exports.submitMutation = submitMutation;
module.exports.gsubmit_multi = gsubmit_multi;
module.exports.gsubmit = gsubmit;
