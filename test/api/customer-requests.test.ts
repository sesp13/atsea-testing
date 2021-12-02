import { get, post } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import { ApiHelpers } from './helpers/apiHelpers';

import * as chai from 'chai';

const expect = chai.expect;

const baseUrl = `http://localhost:8080/api/customer/`;

// Global variables
const customerBody = {
  customerId: 5000,
  name: 'Sally Vallery',
  address: '144 Townsend, San Francisco 99999',
  email: 'sally@example.com',
  phone: '513 222 5555',
  username: 'sallyv',
  password: 'sallypassword',
  enabled: 'true',
  role: 'USER',
};

// Test body

describe('Customer endpoints tests', () => {
  let customerFetched;

  it('Get user by id', async () => {
    try {
      const response = await get(`${baseUrl}${customerBody.customerId}`);
      expect(response.status).to.equal(StatusCodes.OK);
      customerFetched = response.body;
      expect(customerFetched).to.be.an('object');
      expect(customerFetched).to.haveOwnProperty('customerId');
      expect(customerFetched).to.haveOwnProperty('name');
      expect(customerFetched).to.haveOwnProperty('address');
      expect(customerFetched).to.haveOwnProperty('email');
      expect(customerFetched).to.haveOwnProperty('username');
      expect(customerFetched).to.haveOwnProperty('phone');
    } catch (error) {
      // Behavior if the customer doesn't exists
      expect(error.status).to.equal(StatusCodes.NOT_FOUND);
      const body = ApiHelpers.expectErrorStructure(error);
      expect(body.errorMessage).to.equal(
        `Customer with id ${customerBody.customerId} not found`
      );
    }
  });

  it('Create Customer', async () => {
    try {
      const response = await post(baseUrl).send(customerBody);
      expect(response.status).to.equal(StatusCodes.CREATED);
      expect(response.body).to.be.an('object');
      expect(response.body).to.haveOwnProperty('customerId');
      expect(response.body.customerId).to.equal(customerBody.customerId);
    } catch (error) {
      // Behavior if the user already exists
      expect(error.status).to.equal(StatusCodes.CONFLICT);
      const body = ApiHelpers.expectErrorStructure(error);
      console.log(body);
      expect(body.errorMessage).to.equal(
        `A customer with username ${customerBody.username} already exists.`
      );
    }
  });
});
