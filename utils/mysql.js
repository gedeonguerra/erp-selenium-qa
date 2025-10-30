/**
 * Utilitário MySQL
 * Demonstra conhecimento avançado em banco de dados
 * Funciona sem MySQL instalado (modo demo/documentação)
 */

const mysql = require('mysql2/promise');
const config = require('../config/config');

class MySQL {
    /**
     * Tenta conectar ao MySQL
     * Retorna null se não disponível (OK para modo demo)
     * @returns {Promise<Connection|null>}
     */
    static async conectar() {
        try {
            const conexao = await mysql.createConnection(config.database);
            console.log('✅ MySQL conectado');
            return conexao;
        } catch (erro) {
            console.log('⚠️ MySQL não disponível (modo demo)');
            console.log('   Isso é normal se não tiver banco instalado');
            return null;
        }
    }
    
    /**
     * Valida cliente no banco
     * @param {Connection} conexao
     * @param {string} nomeCliente
     */
    static async validarCliente(conexao, nomeCliente) {
        if (!conexao) return null;
        
        const query = `
            SELECT customer_name, customer_type, territory 
            FROM tabCustomer 
            WHERE customer_name = ? 
            LIMIT 1
        `;
        
        const [resultado] = await conexao.execute(query, [nomeCliente]);
        return resultado[0] || null;
    }
    
    /**
     * Conta registros em tabela
     * @param {Connection} conexao
     * @param {string} tabela
     */
    static async contarRegistros(conexao, tabela) {
        if (!conexao) return 0;
        
        const query = `SELECT COUNT(*) as total FROM ${tabela}`;
        const [resultado] = await conexao.execute(query);
        return resultado[0].total;
    }
    
    /**
     * Valida lançamento financeiro (query complexa com JOIN)
     * @param {Connection} conexao
     * @param {string} codigo
     */
    static async validarLancamentoFinanceiro(conexao, codigo) {
        if (!conexao) return null;
        
        const query = `
            SELECT 
                gl.name,
                gl.posting_date,
                gl.total_debit,
                gl.total_credit,
                COUNT(gle.name) as numero_linhas,
                CASE 
                    WHEN gl.total_debit = gl.total_credit THEN 'BALANCEADO'
                    ELSE 'DESBALANCEADO'
                END as status
            FROM \`tabGL Entry\` gl
            LEFT JOIN \`tabGL Entry\` gle ON gl.name = gle.parent
            WHERE gl.name = ?
            GROUP BY gl.name
        `;
        
        const [resultado] = await conexao.execute(query, [codigo]);
        return resultado[0] || null;
    }
    
    /**
     * Busca estoque crítico (query avançada)
     * Demonstra: múltiplos JOINs, CASE, subconsultas
     */
    static async buscarEstoqueCritico(conexao) {
        if (!conexao) return [];
        
        const query = `
            SELECT 
                b.item_code,
                i.item_name,
                b.warehouse,
                b.actual_qty AS qtd_atual,
                b.reserved_qty AS qtd_reservada,
                (b.actual_qty - b.reserved_qty) AS qtd_disponivel,
                ir.reorder_level AS nivel_reposicao,
                CASE 
                    WHEN (b.actual_qty - b.reserved_qty) < ir.reorder_level THEN 'CRÍTICO'
                    WHEN (b.actual_qty - b.reserved_qty) < (ir.reorder_level * 1.5) THEN 'ATENÇÃO'
                    ELSE 'OK'
                END AS status_estoque
            FROM \`tabBin\` b
            JOIN \`tabItem\` i ON b.item_code = i.name
            LEFT JOIN \`tabItem Reorder\` ir ON i.name = ir.parent
            WHERE (b.actual_qty - b.reserved_qty) < ir.reorder_level
            ORDER BY status_estoque DESC, qtd_disponivel ASC
            LIMIT 50
        `;
        
        const [resultado] = await conexao.execute(query);
        return resultado;
    }
    
    /**
     * Análise de vendas (query complexa com agregações)
     * Demonstra: GROUP BY, HAVING, CASE, funções de agregação
     */
    static async analisarVendasPorCliente(conexao, ano = null) {
        if (!conexao) return [];
        
        const anoRef = ano || new Date().getFullYear();
        
        const query = `
            SELECT 
                si.customer,
                COUNT(si.name) AS total_notas,
                SUM(si.grand_total) AS faturamento_total,
                AVG(si.grand_total) AS ticket_medio,
                MAX(si.posting_date) AS ultima_compra,
                CASE 
                    WHEN SUM(si.grand_total) > 100000 THEN 'Premium'
                    WHEN SUM(si.grand_total) > 50000 THEN 'Gold'
                    ELSE 'Standard'
                END AS classificacao
            FROM \`tabSales Invoice\` si
            WHERE si.docstatus = 1 AND YEAR(si.posting_date) = ?
            GROUP BY si.customer
            HAVING faturamento_total > 5000
            ORDER BY faturamento_total DESC
            LIMIT 100
        `;
        
        const [resultado] = await conexao.execute(query, [anoRef]);
        return resultado;
    }
    
    /**
     * Busca dados inconsistentes (validação de integridade)
     */
    static async buscarDadosInconsistentes(conexao) {
        if (!conexao) return [];
        
        const query = `
            SELECT name, customer_name, customer_type
            FROM tabCustomer
            WHERE customer_name IS NULL 
               OR customer_name = ''
               OR customer_type IS NULL
            LIMIT 10
        `;
        
        const [resultado] = await conexao.execute(query);
        return resultado;
    }
    
    /**
     * Documenta procedure de auditoria
     * (não executa - apenas demonstração de conhecimento)
     */
    static documentarProcedureAuditoria() {
        const procedure = `
            -- Procedure para auditoria de alterações
            DROP PROCEDURE IF EXISTS sp_auditoria_alteracoes;
            
            DELIMITER $$
            CREATE PROCEDURE sp_auditoria_alteracoes(
                IN p_tabela VARCHAR(100),
                IN p_data_inicio DATE,
                IN p_data_fim DATE
            )
            BEGIN
                SELECT 
                    modified_by AS usuario,
                    DATE(modified) AS data_modificacao,
                    COUNT(*) AS total_alteracoes
                FROM information_schema.tables
                WHERE table_name = p_tabela
                    AND DATE(create_time) BETWEEN p_data_inicio AND p_data_fim
                GROUP BY usuario, DATE(modified)
                ORDER BY data_modificacao DESC;
            END$$
            DELIMITER ;
            
            -- Uso:
            -- CALL sp_auditoria_alteracoes('tabCustomer', '2025-01-01', '2025-10-30');
        `;
        
        console.log('📝 Procedure de auditoria documentada');
        return procedure;
    }
    
    /**
     * Fecha conexão
     */
    static async fecharConexao(conexao) {
        if (conexao) {
            try {
                await conexao.end();
                console.log('✅ Conexão MySQL fechada');
            } catch (erro) {
                console.error('⚠️ Erro ao fechar:', erro.message);
            }
        }
    }
}

module.exports = MySQL;