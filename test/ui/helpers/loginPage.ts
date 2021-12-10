import {$, ElementFinder} from 'protractor'

export class LoginPage {
  private loginBtn: ElementFinder
  private userInput: ElementFinder
  private passwordInput: ElementFinder
  constructor(){
    this.loginBtn = $('.loginFormButton button')
    this.userInput = $('.loginFormRow input[name="username"]')
    this.passwordInput = $('.loginFormRow input[name="password"]')

  }

  public getLoginBtn():ElementFinder{
    return this.loginBtn
  }

  public async fillformAndLogin(username:string, password:string){
    await this.userInput.sendKeys(username)
    await this.passwordInput.sendKeys(password)
    await this.loginBtn.click()
  }

}
