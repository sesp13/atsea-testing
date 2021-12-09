import { expect } from 'chai';
import { browser } from 'protractor';

describe('Open Atsea shop', () => {
  describe('when open the page', () => {
    beforeEach(async () => {
      await browser.get('http://host.docker.internal:8080');
    });

    it('then should have a title', async () => {
      expect(await browser.getTitle()).to.equal('Atsea Shop');
    });

    // afterEach()
  });
});
