import { $, ElementFinder } from 'protractor';

export class HeaderPage {
  private signInBtn: ElementFinder;
  private signOutBtn: ElementFinder;
  private signUpButton: ElementFinder;

  constructor() {
    this.signInBtn = $('.buttonSection button:nth-child(2)');
    this.signOutBtn = $('.buttonSection button:nth-child(2)');
    this.signUpButton = $('.buttonSection button:nth-child(1)');
  }

  public async openSignInModal(): Promise<void> {
    await this.signInBtn.click();
  }

  public async openSignUpModal(): Promise<void> {
    await this.signUpButton.click();
  }

  public async checkSignOut(): Promise<boolean> {
    if ((await this.signOutBtn.getText()).toLowerCase() == 'sign out')
      return true;
    else return false;
  }

  public async checkSignIn(): Promise<boolean> {
    if ((await this.signInBtn.getText()).toLowerCase() == 'sign in')
      return true;
    else return false;
  }

  public async clickSignOutBtn(): Promise<void> {
    await this.signOutBtn.click();
  }
}
