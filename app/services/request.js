const axios = require('axios');
const https = require('https');

module.exports = async (
  path,
  method = 'GET',
  dataOrParams = null,
  options = {},
  baseUrl = process.env.SEARCH_API_HOST,
) => {
  const { data: res } = await axios({
    method,
    url: baseUrl + path,
    data: method.toUpperCase() !== 'GET' && dataOrParams,
    params: dataOrParams,
    headers: {
      'Content-Type': 'application/json',
    },
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    ...options,
  });
  return res;
};
