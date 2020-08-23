const validator = require('express-joi-validation').createValidator({
  joi: { convert: true },
});

module.exports = validator;
