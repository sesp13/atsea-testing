import { expect } from 'chai';
import request = require('superagent');

export class ApiHelpers {
  static expectErrorStructure(error) {
    const body = error.response.body;
    expect(body).to.be.an('object');
    expect(body).to.haveOwnProperty('errorMessage');
    return body;
  }

  static expectUserStructure(response:request.Response, idProperty:string= "customerIf"){
    const customerFetched = response.body;
    expect(customerFetched).to.be.an('object');
    expect(customerFetched).to.haveOwnProperty(idProperty);
    expect(customerFetched).to.haveOwnProperty('name');
    expect(customerFetched).to.haveOwnProperty('address');
    expect(customerFetched).to.haveOwnProperty('email');
    expect(customerFetched).to.haveOwnProperty('username');
    expect(customerFetched).to.haveOwnProperty('phone');
    return customerFetched
  }
}
