import { get } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import * as chai from 'chai';

const expect = chai.expect;

const baseUrl = `http://localhost:8080/`;

describe('Product endpoints tests', () => {
  // Global variables
  let productId;

  it('Get products', async () => {
    const response = await get(`${baseUrl}api/product/`);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.body).to.be.an('array');
    expect(response.body.length).to.equal(9);

    productId = response.body[0].productId;
  });

  it(`Get single product by id `, async () => {
    const response = await get(`${baseUrl}api/product/${productId}`);
    expect(response.status).to.equal(StatusCodes.OK);
    const product = response.body;
    expect(product).to.be.an('object');
    expect(product).to.haveOwnProperty('description');
    expect(product).to.haveOwnProperty('name');
    expect(product).to.haveOwnProperty('price');
    expect(product).to.haveOwnProperty('image');
  });

});
