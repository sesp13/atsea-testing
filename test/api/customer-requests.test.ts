import { get, post, put, del} from 'superagent';
import { StatusCodes } from 'http-status-codes';
import { ApiHelpers } from './helpers/apiHelpers';

import * as chai from 'chai';

const expect = chai.expect;

const baseUrl = `http://localhost:8080/api/customer/`;

// Global variables
const customerBody = {
  customer_id: undefined,
  name: 'Juan Carlos',
  address: '144 Townsend, San Francisco 99999',
  email: 'juanca548@example.com',
  phone: '513 222 5555',
  username: 'juanca548',
  password: 'juancapassword',
  enabled: 'true',
  role: 'USER',
};

// Test body

describe('Customer endpoints tests', () => {
  it('Create Customer', async () => {
    try {
      const response = await post(baseUrl).send(customerBody);
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
  });

  it('Get customer by username', async () => {
    try {
      const response = await get(`${baseUrl}username=${customerBody.username}`);
      expect(response.status).to.equal(StatusCodes.OK);
      const customerFetched = ApiHelpers.expectUserStructure(response)
      customerBody.customer_id = customerFetched.customerIf;
    } catch (error) {
      // Behavior if the customer doesn't exists
      expect(error.status).to.equal(StatusCodes.NOT_FOUND);
      const body = ApiHelpers.expectErrorStructure(error);
      expect(body.errorMessage).to.equal(
        `Customer with username ${customerBody.username} not found`
      );
    }
  });

  it('Get customer by name', async () => {
    try {
      const response = await get(`${baseUrl}name=${customerBody.name}`);
      expect(response.status).to.equal(StatusCodes.OK);
      ApiHelpers.expectUserStructure(response)
    } catch (error) {
      // Behavior if the customer doesn't exists
      expect(error.status).to.equal(StatusCodes.NOT_FOUND);
      const body = ApiHelpers.expectErrorStructure(error);
      expect(body.errorMessage).to.equal(
        `Customer with name ${customerBody.name} not found`
      );
    }
  });

  it('Get customer by id', async () => {
    try {
      const response = await get(`${baseUrl}${customerBody.customer_id}`);
      expect(response.status).to.equal(StatusCodes.OK);
      ApiHelpers.expectUserStructure(response)
    } catch (error) {
      // Behavior if the customer doesn't exists
      expect(error.status).to.equal(StatusCodes.NOT_FOUND);
      const body = ApiHelpers.expectErrorStructure(error);
      expect(body.errorMessage).to.equal(
        `Customer with id ${customerBody.customer_id} not found`
      );
    }
  });

  it('Update Customer', async () => {
    try {
      customerBody.name = "Copito"
      customerBody.phone = "666"
      customerBody.address = "Medellin"
      const response = await put( `${baseUrl}${customerBody.customer_id}`).send(customerBody);
      expect(response.status).to.equal(StatusCodes.OK);
      const customerFetched = ApiHelpers.expectUserStructure(response, "customerId")
      expect(customerFetched.name).to.equal(customerBody.name)
      expect(customerFetched.phone).to.equal(customerBody.phone)
      expect(customerFetched.address).to.equal(customerBody.address)
    } catch (error) {
      // Behavior if the user already exists
      console.log(error)
      expect(error.status).to.equal(StatusCodes.NOT_FOUND);
      const body = ApiHelpers.expectErrorStructure(error);
      expect(body.errorMessage).to.equal(
        `Unable to update. Customer with id ${customerBody.customer_id} not found`
      );
    }
  });

  it('Delete customer', async () => {
    try {
      const response = await del(`${baseUrl}${customerBody.customer_id}`);
      expect(response.status).to.equal(StatusCodes.NO_CONTENT);
    } catch (error) {
      // Behavior if the customer doesn't exists
      expect(error.status).to.equal(StatusCodes.NOT_FOUND);
      const body = ApiHelpers.expectErrorStructure(error);
      expect(body.errorMessage).to.equal(
        `Unable to delete. Customer with id ${customerBody.customer_id} not found`
      );
    }
  });

  it('Delete all customer', async () => {
      const response = await del(baseUrl);
      expect(response.status).to.equal(StatusCodes.NO_CONTENT);
  });

});
