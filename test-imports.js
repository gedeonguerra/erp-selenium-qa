console.log('� Testando imports...\n');

try {
    const config = require('./config/config');
    console.log('✅ config/config.js carregado');
    console.log('   URL:', config.url);
    console.log('   Usuário:', config.usuario);
    
    const Driver = require('./utils/driver');
    console.log('✅ utils/driver.js carregado');
    
    const MySQL = require('./utils/mysql');
    console.log('✅ utils/mysql.js carregado');
    
    const LoginPage = require('./pages/LoginPage');
    console.log('✅ pages/LoginPage.js carregado');
    
    const ModuloFinanceiro = require('./pages/ModuloFinanceiro');
    console.log('✅ pages/ModuloFinanceiro.js carregado');
    
    const ModuloFaturamento = require('./pages/ModuloFaturamento');
    console.log('✅ pages/ModuloFaturamento.js carregado');
    
    console.log('\n� Todos os arquivos carregaram sem erro!');
} catch (erro) {
    console.error('❌ ERRO:', erro.message);
    console.error(erro.stack);
    process.exit(1);
}
