import { $, ElementFinder } from 'protractor';

export class CheckoutPage {
  private firstNameInput: ElementFinder;
  private lastNameInput: ElementFinder;
  private cardNumberInput: ElementFinder;
  private cvvInput: ElementFinder;
  private expirationInput: ElementFinder;
  // Second section fields
  private companyInput: ElementFinder;
  private titleInput: ElementFinder;
  private addressInput: ElementFinder;
  private cityInput: ElementFinder;
  private completeOrderButton: ElementFinder;

  constructor() {
    this.companyInput = $('input[name="company"]');
    this.titleInput = $('input[name="title"]');
    this.addressInput = $('input[name="address"]');
    this.cityInput = $('input[name="city"]');
    this.firstNameInput = $('input[name="firstName"]');
    this.lastNameInput = $('input[name="lastName"]');
    this.cardNumberInput = $('input[name="cardNumber"]');
    this.cvvInput = $('input[name="cvv"]');
    this.expirationInput = $('input[name="expirationDate"]');
    this.completeOrderButton = $('button[type="submit"]');
  }

  public async fillformAndPurchase() {
    await this.companyInput.click();
    await this.companyInput.sendKeys('o');

    await this.titleInput.click();
    await this.titleInput.sendKeys('b');

    await this.addressInput.click();
    await this.addressInput.sendKeys('v');

    await this.cityInput.click();
    await this.cityInput.sendKeys('i');

    await this.firstNameInput.click();
    await this.firstNameInput.sendKeys('t');

    await this.lastNameInput.click();
    await this.lastNameInput.sendKeys('f');

    await this.cardNumberInput.click();
    await this.cardNumberInput.sendKeys('8');

    await this.expirationInput.click();
    await this.expirationInput.sendKeys('7');

    await this.cvvInput.click();
    await this.cvvInput.sendKeys('9');

    await this.completeOrderButton.click();
  }
}
