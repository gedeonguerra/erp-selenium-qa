const { expect } = require('chai');
const Driver = require('../../utils/driver');
const LoginPage = require('../../pages/LoginPage');
const fs = require('fs');
const path = require('path');

describe('FALHAS - Identificação e Reporte de Bugs', function() {
    let driver, loginPage;
    
    before(async function() {
        driver = await Driver.iniciar();
        loginPage = new LoginPage(driver);
    });
    
    after(async function() {
        await Driver.encerrar(driver);
    });
    
    it('CT-BUG-001: Identificar falha de timeout em login', async function() {
        // CENÁRIO: Teste quebrou - investigar causa raiz
        try {
            await loginPage.acessar();
            
            // Simular login lento
            await driver.manage().setTimeouts({ implicit: 5000 });
            await loginPage.loginPadrao();
            
            console.log('✅ Login funcionou - sem falha detectada');
            
        } catch (erro) {
            // IDENTIFICAR FALHA
            const screenshot = await driver.takeScreenshot();
            const timestamp = Date.now();
            const nomeArquivo = `bug-login-${timestamp}.png`;
            const caminho = path.join(__dirname, '../../screenshots', nomeArquivo);
            
            fs.writeFileSync(caminho, screenshot, 'base64');
            
            // REPORTAR BUG
            const relatorio = {
                codigo: 'BUG-001',
                titulo: 'Falha de timeout no login',
                severidade: 'Alta',
                modulo: 'Autenticação',
                passos: [
                    '1. Acessar URL do ERP',
                    '2. Preencher credenciais',
                    '3. Clicar em Login'
                ],
                resultadoEsperado: 'Login deve completar em até 5 segundos',
                resultadoObtido: erro.message,
                evidencia: nomeArquivo,
                ambiente: 'Produção',
                navegador: 'Chrome',
                analise: 'Possível causa: Timeout configurado muito baixo ou lentidão no servidor'
            };
            
            console.log('\n🐛 BUG IDENTIFICADO:');
            console.log(JSON.stringify(relatorio, null, 2));
            
            // Salvar relatório
            fs.writeFileSync(
                path.join(__dirname, '../../reports', `bug-${timestamp}.json`),
                JSON.stringify(relatorio, null, 2)
            );
            
            throw erro;
        }
    });
    
    it('CT-BUG-002: Validar dados inconsistentes no banco', async function() {
        // CENÁRIO: Teste de validação encontrou inconsistência
        const conexao = await MySQL.conectar();
        
        if (!conexao) {
            console.log('⚠️ MySQL não disponível');
            this.skip();
        }
        
        // Query para detectar inconsistência
        const queryInconsistencia = `
            SELECT c.name, c.customer_name
            FROM tabCustomer c
            WHERE c.customer_name IS NULL OR c.customer_name = ''
            LIMIT 5
        `;
        
        try {
            const [resultado] = await conexao.execute(queryInconsistencia);
            
            if (resultado.length > 0) {
                console.log('\n🐛 FALHA IDENTIFICADA: Dados inconsistentes');
                console.log('Registros com problema:', resultado);
                
                // Reportar ao time
                console.log('\nANÁLISE:');
                console.log('- Causa provável: Validação de campo falhando no cadastro');
                console.log('- Impacto: Relatórios podem quebrar');
                console.log('- Sugestão: Adicionar constraint NOT NULL no campo customer_name');
            } else {
                console.log('✅ Sem inconsistências detectadas');
            }
            
        } catch (erro) {
            console.log('⚠️ Tabela não existe em demo - Processo documentado');
        } finally {
            await conexao.end();
        }
    });
});