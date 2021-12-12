import { del, get, put } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import { ApiHelpers } from '../../src/apiHelpers/apiHelpers';

import * as chai from 'chai';
import { CustomerHelpers } from '../../src/apiHelpers/CustomerHelpers';
import { GlobalInformation } from '../GlobalInformation';

const expect = chai.expect;

// Global variables
let customerBody = GlobalInformation.customerSample;

describe('Customer endpoints tests', () => {
  it('Create Customer', async () => {
    customerBody = await CustomerHelpers.createCustomerTestBody(
      GlobalInformation.apiCustomerUrl,
      customerBody
    );
  });

  it('Get customer by username', async () => {
    try {
      const customerFetched = await CustomerHelpers.getCustomerByUsername(
        GlobalInformation.apiCustomerUrl,
        customerBody.username
      );
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
      const response = await get(
        `${GlobalInformation.apiCustomerUrl}name=${customerBody.name}`
      );
      expect(response.status).to.equal(StatusCodes.OK);
      ApiHelpers.expectUserStructure(response);
    } catch (error) {
      // Behavior if the customer doesn't exists
      expect(error.status).to.equal(StatusCodes.NOT_FOUND);
      const body = ApiHelpers.expectErrorStructure(error);
      expect(body.errorMessage).to.equal(
        `Customer with name ${customerBody.name} not found`
      );
    }
  });

  // First get by id test
  it('Get customer by id', async () => {
    await CustomerHelpers.getCustomerByIdTestBody(
      `${GlobalInformation.apiCustomerUrl}${customerBody.customer_id}`,
      customerBody.customer_id
    );
  });

  it('Update Customer', async () => {
    try {
      customerBody.name = 'Copito';
      customerBody.phone = '666';
      customerBody.address = 'Medellin';
      const response = await put(
        `${GlobalInformation.apiCustomerUrl}${customerBody.customer_id}`
      ).send(customerBody);
      expect(response.status).to.equal(StatusCodes.OK);
      const customerFetched = ApiHelpers.expectUserStructure(
        response,
        'customerId'
      );
      expect(customerFetched.name).to.equal(customerBody.name);
      expect(customerFetched.phone).to.equal(customerBody.phone);
      expect(customerFetched.address).to.equal(customerBody.address);
    } catch (error) {
      // Behavior if the user already exists
      expect(error.status).to.equal(StatusCodes.NOT_FOUND);
      const body = ApiHelpers.expectErrorStructure(error);
      expect(body.errorMessage).to.equal(
        `Unable to update. Customer with id ${customerBody.customer_id} not found`
      );
    }
  });

  it('Delete customer', async () => {
    await CustomerHelpers.DeleteCustomerByUsername(
      GlobalInformation.apiCustomerUrl,
      customerBody.username
    );
  });

  // Check that the user deleted doesn't exists anymore
  it('Check customer deletion', async () => {
    await CustomerHelpers.getCustomerByIdTestBody(
      `${GlobalInformation.apiCustomerUrl}${customerBody.customer_id}`,
      customerBody.customer_id
    );
  });

  it('Re create Customer', async () => {
    customerBody = await CustomerHelpers.createCustomerTestBody(
      GlobalInformation.apiCustomerUrl,
      customerBody
    );
  });

  it('Delete all customers', async () => {
    const response = await del(GlobalInformation.apiCustomerUrl);
    expect(response.status).to.equal(StatusCodes.NO_CONTENT);
  });

  // Check that the user deleted doesn't exists anymore
  it('Check customer deletion after bulk deletion method', async () => {
    await CustomerHelpers.getCustomerByIdTestBody(
      `${GlobalInformation.apiCustomerUrl}${customerBody.customer_id}`,
      customerBody.customer_id
    );
  });
});
