import { get } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import * as chai from 'chai';
import { ProductHelpers } from 'src/apiHelpers/ProductHelpers';
import { GlobalInformation } from 'src/GlobalInformation';

const expect = chai.expect;

describe('Product endpoints tests', () => {
  // Global variables
  let productId;

  it('Get products', async () => {
    const productLst = await ProductHelpers.getAllProducts(
      GlobalInformation.apiProductUrl
    );
    productId = productLst[0].productId;
  });

  it(`Get single product by id `, async () => {
    const response = await get(
      `${GlobalInformation.apiProductUrl}${productId}`
    );
    expect(response.status).to.equal(StatusCodes.OK);
    const product = response.body;
    expect(product).to.be.an('object');
    expect(product).to.haveOwnProperty('description');
    expect(product).to.haveOwnProperty('name');
    expect(product).to.haveOwnProperty('price');
    expect(product).to.haveOwnProperty('image');
  });
});
