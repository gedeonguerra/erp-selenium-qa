/**
 * Configurações Centralizadas do Projeto
 * Compatível com os testes existentes (the-internet.herokuapp.com)
 */

require('dotenv').config();

module.exports = {
    // URL de Teste (ajustada para seu ambiente atual)
    url: process.env.BASE_URL || 'https://the-internet.herokuapp.com/login',
    
    // Credenciais (the-internet.herokuapp.com)
    usuario: process.env.ERP_USERNAME || 'tomsmith',
    senha: process.env.ERP_PASSWORD || 'SuperSecretPassword!',
    
    // Configuração do Browser
    browser: process.env.BROWSER || 'chrome',
    headless: process.env.HEADLESS === 'true',
    
    // Timeouts (em milissegundos)
    timeout: {
        implicit: parseInt(process.env.IMPLICIT_WAIT) || 30000,
        explicit: parseInt(process.env.EXPLICIT_WAIT) || 10000,
        pageLoad: parseInt(process.env.PAGE_LOAD_TIMEOUT) || 60000
    },
    
    // Configuração MySQL (para demonstração)
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'erpnext',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    
    // Configurações de Teste
    test: {
        screenshotOnFailure: process.env.SCREENSHOT_ON_FAILURE !== 'false',
        retryFailedTests: parseInt(process.env.RETRY_FAILED_TESTS) || 0
    },
    
    // Diretórios
    paths: {
        screenshots: './screenshots',
        reports: './reports',
        logs: './logs'
    },
    
    // URLs de Módulos (para quando migrar para ERP real)
    modulos: {
        financeiro: '/app/accounting',
        faturamento: '/app/selling',
        suprimentos: '/app/buying',
        estoque: '/app/stock'
    }
};