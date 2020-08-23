const Joi = require('@hapi/joi');

const customJoi = Joi.defaults((schema) => schema.options({
  abortEarly: false,
}));

module.exports = customJoi;
