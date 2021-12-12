import { expect } from 'chai';
import request = require('superagent');

export class ApiHelpers {
  static expectErrorStructure(error) {
    const body = error.response.body;
    expect(body).to.be.an('object');
    expect(body).to.haveOwnProperty('errorMessage');
    return body;
  }

  static expectUserStructure(
    response: request.Response,
    idProperty = 'customerIf'
  ) {
    const customerFetched = response.body;
    expect(customerFetched).to.be.an('object');
    expect(customerFetched).to.haveOwnProperty(idProperty);
    expect(customerFetched).to.haveOwnProperty('name');
    expect(customerFetched).to.haveOwnProperty('address');
    expect(customerFetched).to.haveOwnProperty('email');
    expect(customerFetched).to.haveOwnProperty('username');
    expect(customerFetched).to.haveOwnProperty('phone');
    return customerFetched;
  }

  static expectOrderStructure(orderFetched) {
    expect(orderFetched).to.be.an('object');
    expect(orderFetched).to.haveOwnProperty('orderId');
    expect(orderFetched).to.haveOwnProperty('orderDate');
    expect(orderFetched).to.haveOwnProperty('customerId');
    expect(orderFetched).to.haveOwnProperty('productsOrdered');
    return orderFetched;
  }

  static expectProductStructure(productFetched) {
    expect(productFetched).to.be.an('object');
    expect(productFetched).to.haveOwnProperty('productId');
    expect(productFetched).to.haveOwnProperty('name');
    expect(productFetched).to.haveOwnProperty('price');
    expect(productFetched).to.haveOwnProperty('description');
    expect(productFetched).to.haveOwnProperty('image');
    return productFetched;
  }
}
