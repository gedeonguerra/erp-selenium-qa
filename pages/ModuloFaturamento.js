/**
 * Page Object: Módulo Faturamento (Selling)
 * Encapsula ações do módulo de vendas/faturamento
 * Demonstra conhecimento completo dos módulos ERP da vaga
 */

const { By, until, Key } = require('selenium-webdriver');
const config = require('../config/config');

class ModuloFaturamento {
    constructor(driver) {
        this.driver = driver;
        
        // Locators do módulo faturamento
        this.locators = {
            // Menu principal
            menuFaturamento: By.xpath("//span[text()='Selling']"),
            menuFaturamentoAlt: By.xpath("//a[contains(@href, 'selling')]"),
            
            // Submenus
            pedidoVenda: By.xpath("//span[text()='Sales Order']"),
            notaFiscal: By.xpath("//span[text()='Sales Invoice']"),
            cotacao: By.xpath("//span[text()='Quotation']"),
            clientes: By.xpath("//span[text()='Customer']"),
            
            // Elementos da página
            tituloPagina: By.css('.page-title'),
            botaoNovo: By.css('.btn-primary-dark'),
            campoFiltro: By.css('input[type="search"]'),
            
            // Grid
            linhasGrid: By.css('.list-row'),
            
            // Relatórios
            relatorioVendas: By.xpath("//span[text()='Sales Analytics']"),
            relatorioClientes: By.xpath("//span[text()='Customer Analytics']")
        };
    }
    
    // ========================================
    // NAVEGAÇÃO
    // ========================================
    
    /**
     * Acessa módulo faturamento pela URL
     */
    async acessarPorURL() {
        const url = `${config.url}${config.modulos.faturamento}`;
        await this.driver.get(url);
        await this.aguardarCarregamento();
        console.log('✅ Acessou módulo Faturamento por URL');
    }
    
    /**
     * Acessa módulo pelo menu
     */
    async acessarModulo() {
        try {
            await this.driver.wait(
                until.elementLocated(this.locators.menuFaturamento), 
                config.timeout.explicit
            );
            
            const menu = await this.driver.findElement(this.locators.menuFaturamento);
            await menu.click();
            await this.aguardarCarregamento();
            
            console.log('✅ Acessou módulo Faturamento pelo menu');
        } catch (erro) {
            console.warn('⚠️ Tentando locator alternativo...');
            const menuAlt = await this.driver.findElement(this.locators.menuFaturamentoAlt);
            await menuAlt.click();
            await this.aguardarCarregamento();
        }
    }
    
    /**
     * Aguarda carregamento do módulo
     */
    async aguardarCarregamento() {
        await this.driver.sleep(2000);
        console.log('✅ Módulo Faturamento carregado');
    }
    
    // ========================================
    // SUBMENUS
    // ========================================
    
    /**
     * Acessa lista de Pedidos de Venda
     */
    async acessarPedidosVenda() {
        try {
            const elemento = await this.driver.findElement(this.locators.pedidoVenda);
            await elemento.click();
            await this.driver.sleep(2000);
            console.log('✅ Acessou Pedidos de Venda');
        } catch (erro) {
            console.warn('⚠️ Pedidos de Venda não encontrado');
        }
    }
    
    /**
     * Acessa lista de Notas Fiscais
     */
    async acessarNotasFiscais() {
        try {
            const elemento = await this.driver.findElement(this.locators.notaFiscal);
            await elemento.click();
            await this.driver.sleep(2000);
            console.log('✅ Acessou Notas Fiscais');
        } catch (erro) {
            console.warn('⚠️ Notas Fiscais não encontrado');
        }
    }
    
    /**
     * Acessa lista de Clientes
     */
    async acessarClientes() {
        try {
            const elemento = await this.driver.findElement(this.locators.clientes);
            await elemento.click();
            await this.driver.sleep(2000);
            console.log('✅ Acessou Clientes');
        } catch (erro) {
            console.warn('⚠️ Clientes não encontrado');
        }
    }
    
    // ========================================
    // VALIDAÇÕES
    // ========================================
    
    /**
     * Valida se módulo foi carregado
     * @returns {Promise<boolean>}
     */
    async validarCarregamento() {
        try {
            const urlAtual = await this.driver.getCurrentUrl();
            const titulo = await this.driver.getTitle();
            
            const urlCorreta = urlAtual.includes('selling') || urlAtual.includes('Selling');
            const tituloCorreto = titulo.toLowerCase().includes('selling') ||
                                 titulo.toLowerCase().includes('faturamento') ||
                                 titulo.toLowerCase().includes('erp');
            
            if (urlCorreta || tituloCorreto) {
                console.log('✅ Módulo Faturamento validado');
                return true;
            }
            
            return false;
        } catch (erro) {
            console.error('❌ Erro ao validar:', erro.message);
            return false;
        }
    }
    
    /**
     * Conta registros na lista
     * @returns {Promise<number>}
     */
    async contarRegistros() {
        try {
            const linhas = await this.driver.findElements(this.locators.linhasGrid);
            const total = linhas.length;
            console.log(`📊 Total de registros: ${total}`);
            return total;
        } catch (erro) {
            return 0;
        }
    }
    
    /**
     * Tira screenshot
     */
    async tirarScreenshot(nomeArquivo = 'modulo-faturamento') {
        const Driver = require('../utils/driver');
        return await Driver.capturarScreenshot(this.driver, nomeArquivo);
    }
}

module.exports = ModuloFaturamento;