import { CustomerHelpers } from './helpers/CustomerHelpers';
import { customerSample } from './helpers/GlobalInformation';
import { ProductHelpers } from './helpers/ProductHelpers';
import { OrderHelpers } from './helpers/OrderHelpers';
import { get } from 'superagent';
import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';

// const expect = chai.expect;

const baseUrl = `http://localhost:8080/api/`;
const customerUrl = `${baseUrl}customer/`;
const productUrl = `${baseUrl}product/`;
const orderUrl = `${baseUrl}order/`;

// Global variables
let customerBody = customerSample;
let lstProducts: any[];

// let orderBody = {
//   orderId: 1,
//   orderDate: undefined,
//   customerId: undefined,
//   productsOrdered: {},
// };

describe('Get test data to work with orders', () => {
  it('Create Customer to test with', async () => {
    customerBody = await CustomerHelpers.createCustomerTestBody(
      customerUrl,
      customerBody
    );
  });

  it('Get all products to place orders', async () => {
    lstProducts = await ProductHelpers.getAllProducts(productUrl);
  });
});

describe('Order endpoints tests', () => {
  it('Create order', async () => {
    // orderBody =  OrderHelpers.createOrder(
    //   orderUrl,
    //   lstProducts,
    //   customerBody.customer_id
    // );
    OrderHelpers.createOrder(orderUrl, lstProducts, customerBody.customer_id);
  });

  it('get all orders', async () => {
    const response = await get(orderUrl);
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.body).to.be.an('array');
    // Check if the order 1 exists
    let orderExists = false;
    response.body.forEach((x) => {
      if (x.orderId == 1) {
        orderExists = true;
      }
    });
    expect(orderExists).to.equal(true);
  });
});
