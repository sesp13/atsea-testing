import { expect } from 'chai';
import { browser } from 'protractor';
import { CustomerHelpers } from '../../../test/api/helpers/CustomerHelpers';
import { customerSample } from '../../../test/api/helpers/GlobalInformation';
import { HeaderPage } from '../helpers/headerPage';
import { LoginPage } from '../helpers/loginPage';

let customerBody = customerSample;
describe('Sign in proccess', () => {
  const headerPage: HeaderPage = new HeaderPage();
  const loginPage: LoginPage = new LoginPage();
  before(async () => {
    const userUrl = `http://localhost:8080/api/customer/`;
    await browser.get('http://host.docker.internal:8080');
    customerBody = await CustomerHelpers.createCustomerTestBody(
      userUrl,
      customerBody
    );
  });
  it('open sign in modal', async () => {
    await headerPage.openSignInModal();
    await browser.sleep(3000);
    expect(await loginPage.getLoginBtn().isDisplayed()).to.be.true;
  });

  it('fill login form and login', async () => {
    await loginPage.fillformAndLogin(
      customerBody.username,
      customerBody.password
    );
    await browser.sleep(4000);
    expect(await headerPage.checkSignOut()).to.be.true;
  });

  it('sign out and check', async () => {
    await headerPage.clickSignOutBtn();
    await browser.sleep(3000);
    expect(await headerPage.checkSignIn()).to.be.true;
  });
});
