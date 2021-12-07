import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import { get } from 'superagent';

export class ProductHelpers {
  static async getAllProducts(url) {
    const response = await get(url);
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.body).to.be.an('array');
    expect(response.body.length).to.equal(9);
    return response.body
  }
}
