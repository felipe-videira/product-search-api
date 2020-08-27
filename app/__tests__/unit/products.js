const productsService = require('../../services/products');
const requestMock = require('../../services/request');
const productsListResponse = require('../data/productsList.json');
const productDetailsResponse = require('../data/productDetails.json');

jest.mock('../../services/request');

describe('Products Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return the products list without crashing', async () => {
    const paramsMock = { q: 'iphone' };

    const promiseReturned = productsService.getProducts(paramsMock);

    await expect(promiseReturned).resolves.toBeDefined();
  });

  it('Should return the product details without crashing', async () => {
    const paramsMock = { id: 'id' };

    const promiseReturned = productsService.getProductById(paramsMock);

    await expect(promiseReturned).resolves.toBeDefined();
  });

  it('Should request the products list with the given params', async () => {
    const paramsMock = { q: 'iphone' };

    const expectedRequestParams = ['/sites/MLA/search', 'GET', { q: paramsMock.q, limit: 4 }];

    await productsService.getProducts(paramsMock);

    expect(requestMock).toHaveBeenCalledWith(...expectedRequestParams);
  });

  it('Should request the product details with the given params', async () => {
    const paramsMock = { id: 'id' };

    const expectedRequestParamsCall1 = [`items/${paramsMock.id}`, 'GET'];
    const expectedRequestParamsCall2 = [`items/${paramsMock.id}/description`, 'GET'];

    await productsService.getProductById(paramsMock);

    expect(requestMock).toHaveBeenNthCalledWith(1, ...expectedRequestParamsCall1);
    expect(requestMock).toHaveBeenNthCalledWith(2, ...expectedRequestParamsCall2);
  });

  it('Should return the products list in the expected format', async () => {
    const paramsMock = { q: 'iphone' };

    const returnedPromise = productsService.getProducts(paramsMock);

    await expect(returnedPromise).resolves.toEqual(productsListResponse);
  });

  it('Should return the product details in the expected format', async () => {
    const paramsMock = { id: 'id' };

    const returnedPromise = productsService.getProductById(paramsMock);

    await expect(returnedPromise).resolves.toEqual(productDetailsResponse);
  });
});
