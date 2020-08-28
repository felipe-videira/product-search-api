/* eslint-disable camelcase */
const request = require('./request');
const { getAuthor, getDecimals } = require('../utils');

module.exports.getProducts = async ({ q }) => {
  try {
    const { filters, available_filters, results } = await request('/sites/MLA/search', 'GET', { q, limit: 4 });

    let categoryFilter = filters.find((item) => item.id === 'category');

    if (!categoryFilter) {
      categoryFilter = available_filters.find((item) => item.id === 'category');
    }

    let categories = [];

    if (categoryFilter) {
      const [mainCategory] = categoryFilter.values;

      if (mainCategory && mainCategory.path_from_root) {
        categories = mainCategory.path_from_root.map((item) => item.name);
      }
    }

    const items = results.map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: parseInt(item.price, 10),
        decimals: getDecimals(item.price),
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      city_name: item.address.city_name,
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
    const [details, description] = await Promise.all([
      request(`items/${id}`, 'GET'),
      request(`items/${id}/description`, 'GET'),
    ]);

    const categoryData = await request(`categories/${details.category_id}`, 'GET');

    const categories = categoryData.path_from_root.map((item) => item.name);

    const item = {
      id: details.id,
      title: details.title,
      price: {
        currency: details.currency_id,
        amount: parseInt(details.price, 10),
        decimals: getDecimals(details.price),
      },
      picture: details.pictures[0].secure_url,
      condition: details.condition,
      free_shipping: details.shipping.free_shipping,
      sold_quantity: details.sold_quantity,
      description: description.plain_text,
    };

    return {
      author: getAuthor(),
      item,
      categories,
    };
  } catch (error) {
    console.log('productService.getProductById error:', error);
    throw error;
  }
};
