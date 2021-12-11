import { $, ElementFinder } from 'protractor';

export class HomePage {
  private addButton: ElementFinder;
  private checkoutButton: ElementFinder;
  private cartDigit: ElementFinder;

  constructor() {
    this.addButton = $('.tileAdd button');
    this.checkoutButton = $('.checkout-button');
    this.cartDigit = $('.cartDigit');
  }

  public getAddBtn(): ElementFinder {
    return this.addButton;
  }

  public getCheckoutBtn(): ElementFinder {
    return this.checkoutButton;
  }

  public getCartDigit(): ElementFinder {
    return this.cartDigit;
  }

  public async addProduct(): Promise<void> {
    await this.addButton.click();
  }

  public async goToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
