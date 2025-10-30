const { By, until } = require('selenium-webdriver');

class ModuloFinanceiro {
    constructor(driver) {
        this.driver = driver;
        this.menuFinanceiro = By.xpath("//span[text()='Accounting']");
        this.opcaoContasPagar = By.xpath("//span[text()='Accounts Payable']");
    }
    
    async acessarModulo() {
        await this.driver.wait(until.elementLocated(this.menuFinanceiro), 10000);
        await this.driver.findElement(this.menuFinanceiro).click();
        await this.driver.sleep(2000);
    }
    
    async validarCarregamento() {
        const titulo = await this.driver.getTitle();
        return titulo.includes('Accounting') || titulo.includes('ERP');
    }
}

module.exports = ModuloFinanceiro;