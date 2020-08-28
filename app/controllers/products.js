const service = require('../services/products');

module.exports.getProducts = async (req, res) => {
  try {
    res.send(await service.getProducts(req.query));
  } catch (error) {
    res.status(error.response.status || 500).send(error.message);
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    res.send(await service.getProductById(req.params));
  } catch (error) {
    res.status(error.response.status || 500).send(error.message);
  }
};
