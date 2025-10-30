/**
 * Utilitário para gerenciar o WebDriver
 * Versão simplificada - compatível com testes existentes
 */

const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

class Driver {
    /**
     * Inicializa o WebDriver com configurações padrão
     * @returns {Promise<WebDriver>}
     */
    static async iniciar() {
        const options = new chrome.Options();
        options.addArguments('--start-maximized');
        options.addArguments('--disable-notifications');
        
        const driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        
        await driver.manage().setTimeouts({ implicit: 30000 });
        
        console.log('✅ WebDriver iniciado');
        return driver;
    }
    
    /**
     * Encerra o WebDriver
     * @param {WebDriver} driver
     */
    static async encerrar(driver) {
        if (driver) {
            try {
                await driver.quit();
                console.log('✅ WebDriver encerrado');
            } catch (erro) {
                console.error('⚠️ Erro ao encerrar driver:', erro.message);
            }
        }
    }
    
    /**
     * Captura screenshot
     * @param {WebDriver} driver
     * @param {string} nomeArquivo - Nome sem extensão
     * @returns {Promise<string>} - Caminho do arquivo salvo
     */
    static async capturarScreenshot(driver, nomeArquivo) {
        try {
            const screenshotsDir = path.join(__dirname, '../screenshots');
            
            // Criar diretório se não existir
            if (!fs.existsSync(screenshotsDir)) {
                fs.mkdirSync(screenshotsDir, { recursive: true });
            }
            
            const screenshot = await driver.takeScreenshot();
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const arquivo = path.join(screenshotsDir, `${nomeArquivo}-${timestamp}.png`);
            
            fs.writeFileSync(arquivo, screenshot, 'base64');
            console.log(`📸 Screenshot: ${arquivo}`);
            
            return arquivo;
        } catch (erro) {
            console.error('⚠️ Erro ao capturar screenshot:', erro.message);
            return null;
        }
    }
}

module.exports = Driver;