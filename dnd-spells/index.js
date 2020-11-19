const superagent = require("superagent");
const config = require("./config.json");

async function search(query) {
  query = query.replace(/ /g, "+");
  try {
    const apiResponse = await superagent.get(config.url).query({ name: query });
    return apiResponse.body;
  } catch (err) {
    return err;
  }
}

async function fetch(id) {
  const fetchUrl = `${config.url}${id}`;
  try {
    const apiResponse = await superagent.get(fetchUrl);
    return apiResponse.body;
  } catch (err) {
    return err;
  }
}

module.exports = {
  search,
  fetch
};
