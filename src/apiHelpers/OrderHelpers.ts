import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import { get, post } from 'superagent';
import { ApiHelpers } from 'src/apiHelpers/ApiHelpers';

export class OrderHelpers {
  static async createOrderTestBody(
    url: string,
    lstProducts: any[],
    customerId: string
  ) {
    const orderBody = {
      orderId: 1,
      orderDate: new Date().toISOString(),
      customerId,
      productsOrdered: {},
    };
    // Set products ordered
    orderBody.productsOrdered[lstProducts[0].productId] = 1;
    orderBody.productsOrdered[lstProducts[1].productId] = 2;
    orderBody.productsOrdered[lstProducts[2].productId] = 5;
    orderBody.productsOrdered[lstProducts[4].productId] = 3;

    try {
      // Set order body
      // orderBody.orderId = 1;

      // Perform request
      const response = await post(url).send(orderBody);
      expect(response.status).to.equal(StatusCodes.CREATED);
      expect(response.body).to.be.an('object');
      expect(response.body).to.haveOwnProperty('orderId');

      //Set current order id in global body
      orderBody.orderId = response.body.orderId;
    } catch (error) {
      // Behavior if the order already exists
      expect(error.status).to.equal(StatusCodes.CONFLICT);
      const body = ApiHelpers.expectErrorStructure(error);
      expect(body.errorMessage).to.equal(
        `Unable to create. An order with id ${orderBody.orderId} already exists.`
      );
    }

    return orderBody;
  }

  static async getOrderByIdTestBody(url: string, expectedId) {
    try {
      const response = await get(`${url}${expectedId}`);
      expect(response.status).to.equal(StatusCodes.OK);
      const body = ApiHelpers.expectOrderStructure(response.body);
      expect(body.orderId).to.equal(expectedId);
    } catch (error) {
      expect(error.status).to.equal(StatusCodes.NOT_FOUND);
      const body = ApiHelpers.expectErrorStructure(error);
      expect(body.errorMessage).to.equal(
        `Order with id ${expectedId} not found`
      );
    }
  }
}
