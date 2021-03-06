const NetlifyGraph = require("../../lib/netlifyGraph");

exports.handler = async (req, res) => {
  // By default, all API calls use no authentication
  let accessToken = null;

  //// If you want to use the client's accessToken when making API calls on the user's behalf:
  accessToken = req.headers["authorization"]?.split(" ")[1];

  //// If you want to use the API with your own access token:
  // accessToken = process.env.ONEGRAPH_AUTHLIFY_TOKEN;

  const eventBodyJson = req.body || {};

  const query = eventBodyJson?.query;

  const { errors, data } = await NetlifyGraph.fetchSpotifySearch(
    { query: query },
    { accessToken: accessToken }
  );

  if (errors) {
    console.error(JSON.stringify(errors, null, 2));
  }

  console.log(JSON.stringify(data, null, 2));

  res.setHeader("Content-Type", "application/json");

  return res.status(200).json({
    errors,
    data,
  });
};

exports.default = exports.handler;

/**
 * Client-side invocations:
 * Call your Netlify function from the browser with this helper:
 */

/**
async function fetchSpotifySearch(netlifyGraphAuth, params) {
  const {query} = params || {};
  const resp = await fetch(`/api/SpotifySearch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    ...netlifyGraphAuth?.authHeaders()
    },
    body: JSON.stringify({"query": query})
  });

  const text = await resp.text();

  return JSON.parse(text);
}
*/
