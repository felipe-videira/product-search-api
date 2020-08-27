const searchMock = require('./data/search.json');
const itemMock = require('./data/item.json');
const descriptionMock = require('./data/description.json');

module.exports = jest.fn(async (path, method, dataOrParams) => {
  const getRequest = method.toUpperCase() === 'GET';

  if (path === '/sites/MLA/search' && getRequest && !!dataOrParams.q) {
    return searchMock;
  }

  if (path.indexOf('items') !== -1 && getRequest) {
    if (path.indexOf('description') !== -1) {
      return descriptionMock;
    }

    return itemMock;
  }

  throw Error();
});
