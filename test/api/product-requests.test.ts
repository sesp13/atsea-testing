import { get } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import * as chai from 'chai';
import { ProductHelpers } from './helpers/ProductHelpers';

const expect = chai.expect;

const baseUrl = `http://localhost:8080/api/product/`;

describe('Product endpoints tests', () => {
  // Global variables
  let productId;

  it('Get products', async () => {
    const productLst = await ProductHelpers.getAllProducts(baseUrl);
    productId = productLst[0].productId;
  });

  it(`Get single product by id `, async () => {
    const response = await get(`${baseUrl}${productId}`);
    expect(response.status).to.equal(StatusCodes.OK);
    const product = response.body;
    expect(product).to.be.an('object');
    expect(product).to.haveOwnProperty('description');
    expect(product).to.haveOwnProperty('name');
    expect(product).to.haveOwnProperty('price');
    expect(product).to.haveOwnProperty('image');
  });
});
