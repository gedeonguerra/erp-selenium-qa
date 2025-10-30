const { By, until } = require('selenium-webdriver');
const config = require('../config/config');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        // Seletores para the-internet.herokuapp.com
        this.campoUsuario = By.id('username');
        this.campoSenha = By.id('password');
        this.botaoLogin = By.css('button[type="submit"]');
    }
    
    async acessar() {
        await this.driver.get(config.url);
        await this.driver.wait(until.elementLocated(this.campoUsuario), 10000);
    }
    
    async fazerLogin(usuario, senha) {
        await this.driver.findElement(this.campoUsuario).sendKeys(usuario);
        await this.driver.findElement(this.campoSenha).sendKeys(senha);
        await this.driver.findElement(this.botaoLogin).click();
        await this.driver.sleep(2000);
    }
    
    async loginPadrao() {
        await this.fazerLogin(config.usuario, config.senha);
    }
}

module.exports = LoginPage;