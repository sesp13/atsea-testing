import { $, ElementFinder } from 'protractor';

export class SignUpPage {
  private signUpBtn: ElementFinder;
  private userInput: ElementFinder;
  private passwordInput: ElementFinder;
  private successMessage: ElementFinder;
  private successBtn: ElementFinder;

  constructor() {
    this.signUpBtn = $('.createFormButton button');
    this.userInput = $('.createFormRow input[name="username"]');
    this.passwordInput = $('.createFormRow input[name="password"]');
    this.successBtn = $('.successButton button');
    this.successMessage = $('.successMessage');
  }

  public getSignUpBtn(): ElementFinder {
    return this.signUpBtn;
  }

  public getSuccessBtn(): ElementFinder {
    return this.successBtn;
  }

  public getSuccessMessage(): ElementFinder {
    return this.successMessage;
  }

  public async fillformAndSignUp(username: string, password: string) {
    await this.userInput.sendKeys(username);
    await this.passwordInput.sendKeys(password);
    await this.signUpBtn.click();
  }

  public async continueShopping(): Promise<void> {
    await this.successBtn.click();
  }
}
