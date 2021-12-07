import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import { post } from 'superagent';
import { ApiHelpers } from './apiHelpers';

export class OrderHelpers {
  static async createOrder(
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
}
