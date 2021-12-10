//import { expect } from 'chai';
import { browser } from 'protractor';
import { CustomerHelpers } from 'test/api/helpers/CustomerHelpers';
import { customerSample } from 'test/api/helpers/GlobalInformation';
import { HeaderPage } from '../helpers/headerPage';



let customerBody = customerSample;
describe('Sign in proccess', () => {
  const headerPage: HeaderPage = new HeaderPage()
  beforeEach(async () => {
    const userUrl = `http://localhost:8080/api/customer/`;
    await browser.get('http://host.docker.internal:8080');
    customerBody = await CustomerHelpers.createCustomerTestBody(
      userUrl,
      customerBody
    );
  });
  it('open sign in modal'), async () => {
    headerPage.openSignInModal()
    await browser.sleep(3000)
  }
})
