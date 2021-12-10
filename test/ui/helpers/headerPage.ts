import {$, ElementFinder} from 'protractor'

export class HeaderPage {
  private signInBtn: ElementFinder
  constructor(){
    this.signInBtn = $('.buttonSection button:nth-child(2)')
  }

  public async openSignInModal(): Promise<void> {
    await this.signInBtn.click()
  }

}
