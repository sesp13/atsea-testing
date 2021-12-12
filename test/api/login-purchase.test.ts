import { get, post } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import { expect } from 'chai';
import { CustomerHelpers } from 'src/apiHelpers/CustomerHelpers';
import { GlobalInformation } from 'src/GlobalInformation';

let customerBody = GlobalInformation.customerSample;
let token;

describe('Login and purchases endpoint tests', () => {
  it('Create Customer to test with', async () => {
    customerBody = await CustomerHelpers.createCustomerTestBody(
      GlobalInformation.apiCustomerUrl,
      customerBody
    );
  });

  it('Login', async () => {
    try {
      const loginStructure = {
        username: customerBody.username,
        password: customerBody.password,
      };
      const response = await post(GlobalInformation.loginUrl).send(
        loginStructure
      );
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.be.an('object');
      expect(response.body).to.haveOwnProperty('token');
      token = response.body.token;
    } catch (error) {
      expect(error.status).to.equal(StatusCodes.UNAUTHORIZED);
    }
  });

  it('Purchase', async () => {
    try {
      const response = await get(GlobalInformation.purchaseUrl).auth(token, {
        type: 'bearer',
      });
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.be.an('object');
      expect(response.body).to.haveOwnProperty('message');
      expect(response.body.message).to.equal(
        `Thank you for shopping @Sea! We're sending a confirmation email shortly and getting your order ready!`
      );
    } catch (error) {
      expect(error.status).to.equal(StatusCodes.UNAUTHORIZED);
    }
  });
});
