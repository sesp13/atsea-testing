import { $, ElementFinder } from 'protractor';

export class OrderCompletedPage {
  private successMessage: ElementFinder;
  private successBtn: ElementFinder;

  constructor() {
    this.successBtn = $('.successButton');
    this.successMessage = $('.successMessage');
  }

  public getSuccessBtn(): ElementFinder {
    return this.successBtn;
  }

  public getSuccessMessage(): ElementFinder {
    return this.successMessage;
  }

  public async continueShopping(): Promise<void> {
    await this.successBtn.click();
  }
}
