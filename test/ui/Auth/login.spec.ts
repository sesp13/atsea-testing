import { expect } from 'chai';
import { browser } from 'protractor';
import { GlobalInformation } from 'src/GlobalInformation';
import { CustomerHelpers } from 'src/apiHelpers/CustomerHelpers';
import { HeaderPage } from 'src/uiHelpers/headerPage';
import { LoginPage } from 'src/uiHelpers/loginPage';

// Disable ssl verification
GlobalInformation.disableSslVerification();

let customerBody = GlobalInformation.customerSample;
describe('Sign in proccess', () => {
  const headerPage: HeaderPage = new HeaderPage();
  const loginPage: LoginPage = new LoginPage();
  before(async () => {
    await browser.get(GlobalInformation.dockerInternalUrl);
    customerBody = await CustomerHelpers.createCustomerTestBody(
      GlobalInformation.apiCustomerUrl,
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
