console.log('Ì¥ç Testando imports...\n');

try {
    const config = require('./config/config');
    console.log('‚úÖ config/config.js carregado');
    console.log('   URL:', config.url);
    console.log('   Usu√°rio:', config.usuario);
    
    const Driver = require('./utils/driver');
    console.log('‚úÖ utils/driver.js carregado');
    
    const MySQL = require('./utils/mysql');
    console.log('‚úÖ utils/mysql.js carregado');
    
    const LoginPage = require('./pages/LoginPage');
    console.log('‚úÖ pages/LoginPage.js carregado');
    
    const ModuloFinanceiro = require('./pages/ModuloFinanceiro');
    console.log('‚úÖ pages/ModuloFinanceiro.js carregado');
    
    const ModuloFaturamento = require('./pages/ModuloFaturamento');
    console.log('‚úÖ pages/ModuloFaturamento.js carregado');
    
    console.log('\nÌæâ Todos os arquivos carregaram sem erro!');
} catch (erro) {
    console.error('‚ùå ERRO:', erro.message);
    console.error(erro.stack);
    process.exit(1);
}
