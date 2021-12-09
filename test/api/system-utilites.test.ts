import { get } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import { expect } from 'chai';

const baseUrl = `http://localhost:8080/utility/`;

describe('System and utilities tests', () => {
  it('Database Healthcheck', async () => {
    try {
      const response = await get(`${baseUrl}/healthcheck/`);
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.be.an('object');
      expect(response.body).to.haveOwnProperty('status');
    } catch (error) {
      expect(error.status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  });

  it('Get container ID', async () => {
    try {
      const response = await get(`${baseUrl}/containerid/`);
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.be.an('object');
      expect(response.body).to.haveOwnProperty('host');
      expect(response.body).to.haveOwnProperty('ip');
    } catch (error) {
      expect(error.status).to.equal(StatusCodes.NOT_FOUND);
    }
  });
});
