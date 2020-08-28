/* eslint-disable camelcase */
const request = require('./request');
const { getAuthor, getDecimals } = require('../utils');

const parseProduct = (product) => ({
  id: product.id,
  title: product.title,
  price: {
    currency: product.currency_id,
    amount: parseInt(product.price, 10),
    decimals: getDecimals(product.price),
  },
  picture: product.thumbnail,
  condition: product.condition,
  free_shipping: product.shipping.free_shipping,
  sold_quantity: product.sold_quantity,
  city_name: product.address.city_name,
});

module.exports.getProducts = async ({ q }) => {
  try {
    const data = await request('/sites/MLA/search', 'GET', { q, limit: 4 });

    const { values: [categoryValues] } = data.filters.find((item) => item.id === 'category')
      || data.available_filters.find((item) => item.id === 'category');

    const categories = ((categoryValues || {}).path_from_root || []).map((item) => item.name);

    const items = data.results.map((item) => {
      const { sold_quantity, ...product } = parseProduct(item);
      return product;
    });

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
    const [item, description] = await Promise.all([
      request(`items/${id}`, 'GET'),
      request(`items/${id}/description`, 'GET'),
    ]);

    return {
      author: getAuthor(),
      item: {
        ...parseProduct(item),
        description: description && description.plain_text,
      },
    };
  } catch (error) {
    console.log('productService.getProductById error:', error);
    throw error;
  }
};
