/* eslint-disable no-unused-vars */
const request = require('./request');
const { getAuthor, getDecimals } = require('../utils');

module.exports.getProducts = async ({ q }) => {
  try {
    const data = await request('/sites/MLA/search', 'GET', { q, limit: 4 });

    const { values: [categoryValues] } = data.filters.find((item) => item.id === 'category')
      || data.available_filters.find((item) => item.id === 'category');

    const categories = categoryValues['path_from_root'].map((item) => item.name);

    const items = data.results.map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item['currency_id'],
        amount: parseInt(item.price, 10),
        decimals: getDecimals(item.price),
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping['free_shipping'],
    }));

    return {
      author: getAuthor(),
      categories,
      items,
    };
  } catch (error) {
    console.log('productService.getProducts error:', error);
    throw error;
  }
};

module.exports.getProductById = async ({ id }) => {
  try {
    const data = await request(`items/${id}`, 'GET');

    return {
      author: getAuthor(),
    };
  } catch (error) {
    console.log('productService.getProductById error:', error);
    throw error;
  }
};
