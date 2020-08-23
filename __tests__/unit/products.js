const axios = require('axios');
const productsService = require('../../app/services/products');

jest.mock('axios');

describe('Products Service', () => {
  it('Should return the products list in the expected format', async () => {
    const searchMock = { q: 'iphone' };
    const responseMock = { data: { results: [{ name: 'Iphone' }] } };

    axios.get.mockImplementationOnce(() => Promise.resolve(responseMock));

    await expect(productsService.getProducts(searchMock))
      .resolves.toEqual(responseMock.data.results);
  });

  it('Should return the products details, in the expected format', async () => {
    const searchMock = { id: 'aaaa' };
    const responseMock = { data: { name: 'Iphone' } };

    axios.get.mockImplementationOnce(() => Promise.resolve(responseMock));

    await expect(productsService.getProductById(searchMock))
      .resolves.toEqual(responseMock.data);
  });
});
