
## Validações de Banco de Dados ##

A pasta `database/` contém exemplos de queries SQL que seriam usadas para validar integridade de dados em um ERP real:

- Queries de auditoria (verificar saldos balanceados)
- Validações de estoque (itens com quantidade negativa)
- Verificações de integridade referencial 

**Nota**: Estas queries foram escritas baseadas no schema do ERPNext (ERP open-source) como referência. No projeto atual, o MySQL não está sendo usado ativamente porque `the-internet.herokuapp.com` não tem banco acessível. Em um projeto real, essas validações rodariam após cada teste de integração.
-- ============================================
-- 1. MÓDULO FINANCEIRO
-- ============================================

-- 1.1 Conciliação Bancária com DATEDIFF
SELECT 
    pe.name AS numero_pagamento,
    pe.posting_date AS data_pagamento,
    pe.paid_amount AS valor_pago,
    pe.payment_type AS tipo,
    ba.bank_account_name AS conta_bancaria,
    DATEDIFF(CURDATE(), pe.posting_date) AS dias_desde_pagamento,
    CASE 
        WHEN DATEDIFF(CURDATE(), pe.posting_date) <= 30 THEN 'Recente'
        WHEN DATEDIFF(CURDATE(), pe.posting_date) <= 90 THEN 'Médio'
        ELSE 'Antigo'
    END AS classificacao
FROM `tabPayment Entry` pe
JOIN `tabBank Account` ba ON pe.paid_from_account_name = ba.name
WHERE pe.docstatus = 1
    AND pe.posting_date BETWEEN DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND CURDATE()
ORDER BY pe.posting_date DESC
LIMIT 50;

-- 1.2 Análise de Contas a Pagar por Vencimento
SELECT 
    supplier AS fornecedor,
    COUNT(*) AS total_titulos,
    SUM(outstanding_amount) AS valor_total,
    AVG(outstanding_amount) AS ticket_medio,
    MIN(due_date) AS primeiro_vencimento,
    MAX(due_date) AS ultimo_vencimento,
    SUM(CASE WHEN due_date < CURDATE() THEN outstanding_amount ELSE 0 END) AS valor_vencido,
    SUM(CASE WHEN due_date >= CURDATE() THEN outstanding_amount ELSE 0 END) AS valor_a_vencer
FROM `tabPurchase Invoice`
WHERE docstatus = 1
    AND outstanding_amount > 0
GROUP BY supplier
HAVING valor_total > 1000
ORDER BY valor_vencido DESC;

-- ============================================
-- 2. MÓDULO FATURAMENTO
-- ============================================

-- 2.1 Top 20 Clientes com Análise Completa
SELECT 
    si.customer,
    c.customer_type AS tipo_cliente,
    c.territory AS regiao,
    COUNT(si.name) AS total_notas,
    SUM(si.grand_total) AS faturamento_total,
    AVG(si.grand_total) AS ticket_medio,
    MAX(si.posting_date) AS ultima_compra,
    DATEDIFF(CURDATE(), MAX(si.posting_date)) AS dias_sem_comprar,
    CASE 
        WHEN SUM(si.grand_total) > 100000 THEN 'Premium'
        WHEN SUM(si.grand_total) > 50000 THEN 'Gold'
        WHEN SUM(si.grand_total) > 10000 THEN 'Silver'
        ELSE 'Standard'
    END AS classificacao_cliente
FROM `tabSales Invoice` si
JOIN `tabCustomer` c ON si.customer = c.name
WHERE si.docstatus = 1
    AND YEAR(si.posting_date) = YEAR(CURDATE())
GROUP BY si.customer, c.customer_type, c.territory
HAVING faturamento_total > 10000
ORDER BY faturamento_total DESC
LIMIT 20;

-- 2.2 Faturamento Mensal com Comparativo Ano Anterior
SELECT 
    YEAR(posting_date) AS ano,
    MONTH(posting_date) AS mes,
    DATE_FORMAT(posting_date, '%Y-%m') AS periodo,
    COUNT(*) AS total_notas,
    SUM(grand_total) AS faturamento,
    AVG(grand_total) AS ticket_medio,
    LAG(SUM(grand_total)) OVER (ORDER BY YEAR(posting_date), MONTH(posting_date)) AS faturamento_mes_anterior,
    ROUND(
        ((SUM(grand_total) - LAG(SUM(grand_total)) OVER (ORDER BY YEAR(posting_date), MONTH(posting_date))) 
        / LAG(SUM(grand_total)) OVER (ORDER BY YEAR(posting_date), MONTH(posting_date))) * 100, 
        2
    ) AS percentual_crescimento
FROM `tabSales Invoice`
WHERE docstatus = 1
    AND posting_date >= DATE_SUB(CURDATE(), INTERVAL 24 MONTH)
GROUP BY YEAR(posting_date), MONTH(posting_date)
ORDER BY ano DESC, mes DESC;

-- ============================================
-- 3. MÓDULO SUPRIMENTOS
-- ============================================

-- 3.1 Estoque Crítico com Análise de Reposição
SELECT 
    b.item_code,
    i.item_name,
    i.item_group AS grupo,
    b.warehouse AS armazem,
    b.actual_qty AS qtd_atual,
    b.ordered_qty AS qtd_pedida,
    b.reserved_qty AS qtd_reservada,
    (b.actual_qty - b.reserved_qty) AS qtd_disponivel,
    ir.reorder_level AS nivel_reposicao,
    ir.reorder_qty AS qtd_reposicao,
    (ir.reorder_level - (b.actual_qty - b.reserved_qty)) AS qtd_necessaria,
    CASE 
        WHEN (b.actual_qty - b.reserved_qty) <= 0 THEN 'CRÍTICO - SEM ESTOQUE'
        WHEN (b.actual_qty - b.reserved_qty) < ir.reorder_level THEN 'CRÍTICO - ABAIXO DO MÍNIMO'
        WHEN (b.actual_qty - b.reserved_qty) < (ir.reorder_level * 1.5) THEN 'ATENÇÃO'
        ELSE 'OK'
    END AS status_estoque
FROM `tabBin` b
JOIN `tabItem` i ON b.item_code = i.name
LEFT JOIN `tabItem Reorder` ir ON i.name = ir.parent
WHERE b.actual_qty > 0
    AND ir.reorder_level IS NOT NULL
    AND (b.actual_qty - b.reserved_qty) < (ir.reorder_level * 1.5)
ORDER BY 
    CASE 
        WHEN (b.actual_qty - b.reserved_qty) <= 0 THEN 1
        WHEN (b.actual_qty - b.reserved_qty) < ir.reorder_level THEN 2
        ELSE 3
    END,
    qtd_disponivel ASC;

-- 3.2 Análise de Fornecedores por Performance
SELECT 
    po.supplier AS fornecedor,
    COUNT(po.name) AS total_pedidos,
    SUM(po.grand_total) AS valor_total_compras,
    AVG(po.grand_total) AS ticket_medio,
    AVG(DATEDIFF(po.transaction_date, po.schedule_date)) AS prazo_medio_entrega,
    COUNT(CASE WHEN po.status = 'Completed' THEN 1 END) AS pedidos_completos,
    COUNT(CASE WHEN po.status = 'Cancelled' THEN 1 END) AS pedidos_cancelados,
    ROUND(
        (COUNT(CASE WHEN po.status = 'Completed' THEN 1 END) * 100.0 / COUNT(*)),
        2
    ) AS taxa_sucesso_percentual
FROM `tabPurchase Order` po
WHERE po.docstatus = 1
    AND po.transaction_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
GROUP BY po.supplier
HAVING total_pedidos >= 5
ORDER BY taxa_sucesso_percentual DESC, valor_total_compras DESC;

-- ============================================
-- 4. STORED PROCEDURES
-- ============================================

-- 4.1 Procedure: Auditoria de Alterações
DELIMITER $$

DROP PROCEDURE IF EXISTS sp_auditoria_alteracoes$$

CREATE PROCEDURE sp_auditoria_alteracoes(
    IN p_tabela VARCHAR(100),
    IN p_data_inicio DATE,
    IN p_data_fim DATE
)
BEGIN
    -- Buscar todas as alterações em uma tabela específica
    SELECT 
        modified_by AS usuario,
        DATE(modified) AS data_modificacao,
        COUNT(*) AS total_alteracoes,
        MIN(modified) AS primeira_alteracao,
        MAX(modified) AS ultima_alteracao
    FROM information_schema.tables
    WHERE table_name = p_tabela
        AND DATE(create_time) BETWEEN p_data_inicio AND p_data_fim
    GROUP BY modified_by, DATE(modified)
    ORDER BY data_modificacao DESC, total_alteracoes DESC;
END$$

DELIMITER ;

-- 4.2 Procedure: Relatório de Inadimplência
DELIMITER $$

DROP PROCEDURE IF EXISTS sp_relatorio_inadimplencia$$

CREATE PROCEDURE sp_relatorio_inadimplencia(
    IN p_dias_atraso INT
)
BEGIN
    SELECT 
        si.customer AS cliente,
        c.customer_type AS tipo,
        COUNT(si.name) AS total_titulos_vencidos,
        SUM(si.outstanding_amount) AS valor_total_vencido,
        MIN(si.due_date) AS vencimento_mais_antigo,
        MAX(si.due_date) AS vencimento_mais_recente,
        AVG(DATEDIFF(CURDATE(), si.due_date)) AS media_dias_atraso,
        CASE 
            WHEN AVG(DATEDIFF(CURDATE(), si.due_date)) > 90 THEN 'ALTA'
            WHEN AVG(DATEDIFF(CURDATE(), si.due_date)) > 30 THEN 'MÉDIA'
            ELSE 'BAIXA'
        END AS prioridade_cobranca
    FROM `tabSales Invoice` si
    JOIN `tabCustomer` c ON si.customer = c.name
    WHERE si.docstatus = 1
        AND si.outstanding_amount > 0
        AND si.due_date < DATE_SUB(CURDATE(), INTERVAL p_dias_atraso DAY)
    GROUP BY si.customer, c.customer_type
    ORDER BY valor_total_vencido DESC;
END$$

DELIMITER ;

-- ============================================
-- 5. TRIGGERS
-- ============================================

-- 5.1 Trigger: Validação de Cliente antes de Insert
DELIMITER $$

DROP TRIGGER IF EXISTS trg_validar_cliente_before_insert$$

CREATE TRIGGER trg_validar_cliente_before_insert
BEFORE INSERT ON `tabCustomer`
FOR EACH ROW
BEGIN
    -- Validar que cliente tem nome
    IF NEW.customer_name IS NULL OR NEW.customer_name = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Nome do cliente é obrigatório';
    END IF;
    
    -- Validar que cliente tem tipo
    IF NEW.customer_type IS NULL OR NEW.customer_type = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Tipo do cliente é obrigatório';
    END IF;
    
    -- Converter nome para uppercase para padronização
    SET NEW.customer_name = UPPER(NEW.customer_name);
    
    -- Setar data de criação
    SET NEW.creation = NOW();
END$$

DELIMITER ;

-- 5.2 Trigger: Auditoria de Updates
DELIMITER $$

DROP TRIGGER IF EXISTS trg_auditoria_customer_update$$

CREATE TRIGGER trg_auditoria_customer_update
AFTER UPDATE ON `tabCustomer`
FOR EACH ROW
BEGIN
    -- Inserir log de auditoria
    INSERT INTO audit_log (
        table_name,
        record_id,
        field_changed,
        old_value,
        new_value,
        changed_by,
        changed_at
    )
    SELECT 
        'tabCustomer',
        NEW.name,
        'customer_name',
        OLD.customer_name,
        NEW.customer_name,
        USER(),
        NOW()
    WHERE OLD.customer_name != NEW.customer_name;
END$$

DELIMITER ;

-- ============================================
-- 6. VIEWS
-- ============================================

-- 6.1 View: Dashboard Executivo
CREATE OR REPLACE VIEW vw_dashboard_executivo AS
SELECT 
    'Vendas' AS modulo,
    COUNT(*) AS total_registros,
    SUM(grand_total) AS valor_total,
    AVG(grand_total) AS ticket_medio,
    CURDATE() AS data_atualizacao
FROM `tabSales Invoice`
WHERE docstatus = 1
    AND YEAR(posting_date) = YEAR(CURDATE())

UNION ALL

SELECT 
    'Compras' AS modulo,
    COUNT(*) AS total_registros,
    SUM(grand_total) AS valor_total,
    AVG(grand_total) AS ticket_medio,
    CURDATE() AS data_atualizacao
FROM `tabPurchase Invoice`
WHERE docstatus = 1
    AND YEAR(posting_date) = YEAR(CURDATE())

UNION ALL

SELECT 
    'Estoque' AS modulo,
    COUNT(DISTINCT item_code) AS total_registros,
    SUM(actual_qty * valuation_rate) AS valor_total,
    AVG(valuation_rate) AS ticket_medio,
    CURDATE() AS data_atualizacao
FROM `tabBin`
WHERE actual_qty > 0;

-- 6.2 View: Clientes VIP
CREATE OR REPLACE VIEW vw_clientes_vip AS
SELECT 
    c.name AS codigo_cliente,
    c.customer_name,
    c.customer_type,
    c.territory,
    COUNT(si.name) AS total_notas,
    SUM(si.grand_total) AS faturamento_total,
    AVG(si.grand_total) AS ticket_medio,
    MAX(si.posting_date) AS ultima_compra,
    DATEDIFF(CURDATE(), MAX(si.posting_date)) AS dias_sem_comprar
FROM `tabCustomer` c
LEFT JOIN `tabSales Invoice` si ON c.name = si.customer AND si.docstatus = 1
WHERE c.disabled = 0
GROUP BY c.name, c.customer_name, c.customer_type, c.territory
HAVING faturamento_total > 50000
ORDER BY faturamento_total DESC;

-- ============================================
-- 7. ÍNDICES SUGERIDOS (Performance)
-- ============================================

-- Comentado - apenas documentação
/*
-- Índices para tabela Customer
CREATE INDEX idx_customer_name ON `tabCustomer`(customer_name);
CREATE INDEX idx_customer_type ON `tabCustomer`(customer_type);
CREATE INDEX idx_customer_territory ON `tabCustomer`(territory);

-- Índices para tabela Sales Invoice
CREATE INDEX idx_sales_posting_date ON `tabSales Invoice`(posting_date);
CREATE INDEX idx_sales_customer ON `tabSales Invoice`(customer);
CREATE INDEX idx_sales_docstatus ON `tabSales Invoice`(docstatus);

-- Índices para tabela Bin (Estoque)
CREATE INDEX idx_bin_item_warehouse ON `tabBin`(item_code, warehouse);
CREATE INDEX idx_bin_actual_qty ON `tabBin`(actual_qty);

-- Índice composto para análise de vendas
CREATE INDEX idx_sales_customer_date ON `tabSales Invoice`(customer, posting_date, docstatus);
*/

-- ============================================
-- 8. EXEMPLOS DE USO
-- ============================================

-- Exemplo 1: Chamar procedure de auditoria
-- CALL sp_auditoria_alteracoes('tabCustomer', '2025-01-01', '2025-10-30');

-- Exemplo 2: Chamar procedure de inadimplência
-- CALL sp_relatorio_inadimplencia(30);

-- Exemplo 3: Consultar view de dashboard
-- SELECT * FROM vw_dashboard_executivo;

-- Exemplo 4: Consultar clientes VIP
-- SELECT * FROM vw_clientes_vip WHERE dias_sem_comprar <= 90;

-- ============================================
-- FIM DO ARQUIVO
-- ============================================