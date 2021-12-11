import { expect } from 'chai';
import { browser } from 'protractor';
import { GlobalInformation } from '../../GlobalInformation';
import { CustomerHelpers } from '../../../test/api/helpers/CustomerHelpers';
import { HeaderPage } from '../helpers/headerPage';
import { LoginPage } from '../helpers/loginPage';
import { HomePage } from '../helpers/HomePage';
import { CheckoutPage } from '../helpers/CheckoutPage';
import { OrderCompletedPage } from '../helpers/OrderCompletedPage';

let customerBody = GlobalInformation.customerSample;
describe('Purchase Process', () => {
  const headerPage: HeaderPage = new HeaderPage();
  const loginPage: LoginPage = new LoginPage();
  const homePage: HomePage = new HomePage();
  const checkOutPage: CheckoutPage = new CheckoutPage();
  const orderCompletedPage: OrderCompletedPage = new OrderCompletedPage();

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

  it('Add product', async () => {
    const currentCartNumber = await homePage.getCartDigit().getText();
    await homePage.addProduct();
    await browser.sleep(3000);
    const newCartNumber = await homePage.getCartDigit().getText();
    expect(currentCartNumber).not.equal(newCartNumber);
  });

  it('Go to checkout', async () => {
    await homePage.goToCheckout();
  });

  it('Complete checkout data and purchase', async () => {
    await checkOutPage.fillformAndPurchase();
  });

  it('Check order confirmation and continue shopping', async () => {
    await browser.sleep(3000);
    expect(await orderCompletedPage.getSuccessBtn().isDisplayed()).to.be.true;
    expect(await orderCompletedPage.getSuccessMessage().isDisplayed()).to.be
      .true;
    expect(await orderCompletedPage.getSuccessMessage().getText()).to.equal(
      'You have successfully placed an order!'
    );
  });
});
