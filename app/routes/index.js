const express = require('express');
const joi = require('../services/joi');
const validator = require('../middlewares/schemaValidator');
const controller = require('../controllers/products');

const router = express.Router();

/**
* @route GET /items
* @group Products - Product listing and details
* @param {string} q.query.optional - eg: iphone
* @returns {ProductListResponse.model} 200 - Products list
* @returns {Error}  default - Unexpected error
*/
router.get('/items', validator.query(
  joi.object({
    q: joi.string().optional(),
  }),
), controller.getProducts);

/**
* @route GET /items/:id
* @group Products - Product listing and details
* @param {string} id.url.required - Item id
* @returns {ProductDetailsResponse.model} 200 - Product details
* @returns {Error}  default - Unexpected error
*/
router.get('/items/:id', validator.params(
  joi.object({
    id: joi.string().required(),
  }),
), controller.getProductById);

module.exports = router;

/**
* @typedef ProductListResponse
* @property {Author.model} author
* @property {Array<string>} categories
* @property {Array<Product>} items
*/

/**
* @typedef ProductDetailsResponse
* @property {Author.model} author
* @property {ProductDetails.model} item
*/

/**
* @typedef Author
* @property {string} name
* @property {string} lastname
*/

/**
* @typedef Product
* @property {string} id
* @property {string} title
* @property {Price.model} price
* @property {string} picture
* @property {string} condition
* @property {boolean} free_shipping
* @property {string} city_name
*/
/**
* @typedef ProductDetails
* @property {string} id
* @property {string} title
* @property {Price.model} price
* @property {string} picture
* @property {string} condition
* @property {boolean} free_shipping
* @property {string} city_name
* @property {number} sold_quantity
* @property {string} description
*/

/**
* @typedef Price
* @property {string} currency
* @property {number} amount
* @property {number} decimals
*/
