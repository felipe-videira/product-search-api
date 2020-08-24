const { author } = require('../../package.json');

module.exports.getAuthor = () => {
  const [name, lastname] = author.name.split(' ');

  return { name, lastname };
};

module.exports.getDecimals = (n) => (n % 1).toFixed(2);
