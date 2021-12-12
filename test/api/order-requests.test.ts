import { del, get, put } from 'superagent';
import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import { ApiHelpers } from 'src/apiHelpers/apiHelpers';
import { GlobalInformation } from 'src/GlobalInformation';
import { CustomerHelpers } from 'src/apiHelpers/CustomerHelpers';
import { ProductHelpers } from 'src/apiHelpers/ProductHelpers';
import { OrderHelpers } from 'src/apiHelpers/OrderHelpers';

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
      GlobalInformation.apiCustomerUrl,
      customerBody
    );
  });

  it('Get all products to place orders', async () => {
    lstProducts = await ProductHelpers.getAllProducts(
      GlobalInformation.apiProductUrl
    );
  });
});

describe('Order endpoints tests', () => {
  it('Create order', async () => {
    orderBody = await OrderHelpers.createOrderTestBody(
      GlobalInformation.apiOrderUrl,
      lstProducts,
      customerBody.customer_id
    );
  });

  it('get all orders', async () => {
    try {
      const response = await get(GlobalInformation.apiOrderUrl);
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
    await OrderHelpers.getOrderByIdTestBody(
      GlobalInformation.apiOrderUrl,
      orderBody.orderId
    );
  });

  it('Update order', async () => {
    try {
      //Update params
      const newValue = 23;
      orderBody.productsOrdered = {};
      orderBody.productsOrdered[lstProducts[5].productId] = newValue;

      const response = await put(
        `${GlobalInformation.apiOrderUrl}${orderBody.orderId}`
      ).send(orderBody);

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
      const response = await del(
        `${GlobalInformation.apiOrderUrl}${orderBody.orderId}`
      );
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
    await OrderHelpers.getOrderByIdTestBody(
      GlobalInformation.apiOrderUrl,
      orderBody.orderId
    );
  });
});
