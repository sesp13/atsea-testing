import { CustomerHelpers } from './helpers/CustomerHelpers';
import { ProductHelpers } from './helpers/ProductHelpers';
import { OrderHelpers } from './helpers/OrderHelpers';
import { del, get, put } from 'superagent';
import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import { ApiHelpers } from './helpers/apiHelpers';
import { GlobalInformation } from '../GlobalInformation';

// const expect = chai.expect;

const baseUrl = `http://localhost:8080/api/`;
const customerUrl = `${baseUrl}customer/`;
const productUrl = `${baseUrl}product/`;
const orderUrl = `${baseUrl}order/`;

// Global variables
let customerBody = GlobalInformation.customerSample;
let lstProducts: any[];

let orderBody = {
  orderId: 1,
  orderDate: undefined,
  customerId: undefined,
  productsOrdered: {},
};

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
    orderBody = await OrderHelpers.createOrderTestBody(
      orderUrl,
      lstProducts,
      customerBody.customer_id
    );
  });

  it('get all orders', async () => {
    try {
      const response = await get(orderUrl);
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.be.an('array');
      // Check if the order 1 exists
      response.body.forEach((order) => {
        ApiHelpers.expectOrderStructure(order);
      });
    } catch (error) {
      expect(error.status).to.equal(StatusCodes.NO_CONTENT);
    }
  });

  it('Get order by id', async () => {
    await OrderHelpers.getOrderByIdTestBody(orderUrl, orderBody.orderId);
  });

  it('Update order', async () => {
    try {
      //Update params
      const newValue = 23;
      orderBody.productsOrdered = {};
      orderBody.productsOrdered[lstProducts[5].productId] = newValue;

      const response = await put(`${orderUrl}${orderBody.orderId}`).send(
        orderBody
      );

      expect(response.status).to.equal(StatusCodes.OK);
      const body = ApiHelpers.expectOrderStructure(response.body);

      // Check update
      expect(body.productsOrdered).to.haveOwnProperty(lstProducts[5].productId);
      expect(body.productsOrdered[lstProducts[5].productId]).to.equal(newValue);
    } catch (error) {
      expect(error.status).to.equal(StatusCodes.NOT_FOUND);
      const body = ApiHelpers.expectErrorStructure(error);
      expect(body.errorMessage).to.equal(
        `Unable to update. Order with id ${orderBody.orderId} not found.`
      );
    }
  });

  it('Delete order', async () => {
    try {
      const response = await del(`${orderUrl}${orderBody.orderId}`);
      expect(response.status).to.equal(StatusCodes.NO_CONTENT);
    } catch (error) {
      expect(error.status).to.equal(StatusCodes.NOT_FOUND);
      const body = ApiHelpers.expectErrorStructure(error);
      expect(body.errorMessage).to.equal(
        `Unable to delete order. Order with id ${orderBody.orderId} not found.`
      );
    }
  });

  it('Check order deletion', async () => {
    await OrderHelpers.getOrderByIdTestBody(orderUrl, orderBody.orderId);
  });
});
