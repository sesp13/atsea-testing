import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import { get } from 'superagent';
import { ApiHelpers } from 'src/apiHelpers/ApiHelpers';

export class ProductHelpers {
  static async getAllProducts(url) {
    const response = await get(url);
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.body).to.be.an('array');
    response.body.forEach((element) => {
      expect(ApiHelpers.expectProductStructure(element));
    });
    return response.body;
  }
}
