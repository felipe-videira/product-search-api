const axios = require('axios');

module.exports.getProducts = async ({ q }) => {
  const { data } = await axios.get(`${process.env.SEARCH_API_HOST}/sites/MLA/search?q=${q}`);
  return data.results;
};

module.exports.getProductById = async ({ id }) => {
  const { data } = await axios.get(`${process.env.SEARCH_API_HOST}/items/${id}`);
  return data;
};
