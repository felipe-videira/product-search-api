const express = require('express');
const joi = require('../services/joi');
const validator = require('../middlewares/schemaValidator');
const controller = require('../controllers/products');

const router = express.Router();

/**
* @route GET /items
* @group Items - Product listing and details
* @param {string} q.query.optional - eg: iphone
* @returns {Array} 200 - An array of items
* @returns {Error}  default - Unexpected error
*/
router.get('/items', validator.query(
  joi.object({
    q: joi.string().optional(),
  }),
), controller.getProducts);

/**
* @route GET /items/:id
* @group Items - Product listing and details
* @param {string} id.url.required - Item id
* @returns {object} 200 - Item details
* @returns {Error}  default - Unexpected error
*/
router.get('/items/:id', validator.params(
  joi.object({
    id: joi.string().required(),
  }),
), controller.getProductById);

module.exports = router;
