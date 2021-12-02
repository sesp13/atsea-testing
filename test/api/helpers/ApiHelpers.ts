import { expect } from 'chai';

export class ApiHelpers {
  static expectErrorStructure(error) {
    const body = error.response.body;
    expect(body).to.be.an('object');
    expect(body).to.haveOwnProperty('errorMessage');
    return body;
  }
}
