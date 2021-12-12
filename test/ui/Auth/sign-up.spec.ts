import { expect } from 'chai';
import { browser, ExpectedConditions } from 'protractor';
import { CustomerHelpers } from 'src/apiHelpers/CustomerHelpers';
import { GlobalInformation } from 'src/GlobalInformation';
import { HeaderPage } from 'src/uiHelpers/headerPage';
import { SignUpPage } from 'src/uiHelpers/SignupPage';

const headerPage: HeaderPage = new HeaderPage();
const signUpPage: SignUpPage = new SignUpPage();

const userBody = {
  username: 'v',
  password: 'v',
};

describe('Sign up process', () => {
  beforeEach(async () => {
    await browser.get(GlobalInformation.dockerInternalUrl);
    await headerPage.openSignUpModal();
    await browser.sleep(3000);
  });

  it('Signup process', async () => {
    await signUpPage.fillformAndSignUp(userBody.username, userBody.password);
    await browser.wait(
      ExpectedConditions.visibilityOf(await signUpPage.getSuccessBtn()),
      5000
    );
    expect(await signUpPage.getSuccessMessage().getText()).to.equal(
      'Congratulations! Your account has been created!'
    );
    await signUpPage.continueShopping();
  });

  // it('sign out and check', async () => {
  //   await headerPage.clickSignOutBtn();
  //   await browser.sleep(3000);
  //   expect(await headerPage.checkSignIn()).to.be.true;
  // });

  afterEach(async () => {
    await CustomerHelpers.DeleteCustomerByUsername(
      GlobalInformation.apiCustomerUrl,
      userBody.username
    );
  });
});
