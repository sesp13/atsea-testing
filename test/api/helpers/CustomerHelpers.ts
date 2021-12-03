import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import { get, post } from 'superagent';
import { ApiHelpers } from './apiHelpers';

export class CustomerHelpers {
  /*
    Encapsule standard get user by id test
  */
  static async getCustomerByIdTestBody(url: string, expectedId) {
    try {
      const response = await get(url);
      expect(response.status).to.equal(StatusCodes.OK);
      ApiHelpers.expectUserStructure(response);
    } catch (error) {
      // Behavior if the customer doesn't exists
      expect(error.status).to.equal(StatusCodes.NOT_FOUND);
      const body = ApiHelpers.expectErrorStructure(error);
      expect(body.errorMessage).to.equal(
        `Customer with id ${expectedId} not found`
      );
    }
  }

  /*
    Encapsule standard create user test
  */
  static async createCustomerTestBody(
    url: string,
    customerBody: any
  ): Promise<any> {
    try {
      const response = await post(url).send(customerBody);
      expect(response.status).to.equal(StatusCodes.CREATED);
      expect(response.body).to.be.an('object');
      expect(response.body).to.haveOwnProperty('customerId');
      customerBody.customer_id = response.body.customerId;
    } catch (error) {
      // Behavior if the user already exists
      expect(error.status).to.equal(StatusCodes.CONFLICT);
      const body = ApiHelpers.expectErrorStructure(error);
      expect(body.errorMessage).to.equal(
        `A customer with username ${customerBody.username} already exists.`
      );
    }
    return customerBody;
  }
}
