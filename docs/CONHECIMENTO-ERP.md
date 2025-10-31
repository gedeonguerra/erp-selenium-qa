# 💼 Conhecimento em Módulos ERP

## 📊 Visão Geral
Documentação do conhecimento e experiência em módulos de sistemas ERP, alinhado com as necessidades de validação e automação de testes.

---

## 💰 MÓDULO FINANCEIRO

### Contas a Pagar
**Funcionalidades Testadas:**
- ✅ Cadastro de títulos a pagar
- ✅ Cálculo automático de juros e multas por atraso
- ✅ Baixa de títulos (pagamento)
- ✅ Conciliação bancária
- ✅ Integração com contabilidade (partidas dobradas)

**Regras de Negócio Validadas:**
1. **Juros de Mora:** 2% ao mês após vencimento
2. **Multa:** 10% sobre o valor principal
3. **Desconto:** Aplicado apenas se pago antes do vencimento
4. **Integração Contábil:**
   - Débito: Fornecedores (Passivo)
   - Crédito: Bancos (Ativo)

**Casos de Teste Críticos:**
```
CT-FIN-001: Validar cálculo de juros em título vencido há 30 dias
CT-FIN-002: Validar baixa parcial de título
CT-FIN-003: Validar estorno de pagamento
CT-FIN-004: Validar geração de lançamento contábil automático
```

### Contas a Receber
**Funcionalidades Testadas:**
- ✅ Emissão de boletos bancários
- ✅ Controle de inadimplência
- ✅ Negociação de dívidas (parcelamento)
- ✅ Previsão de fluxo de caixa

**Casos de Teste Críticos:**
```
CT-FIN-010: Validar geração de arquivo remessa CNAB 240/400
CT-FIN-011: Validar importação de arquivo retorno bancário
CT-FIN-012: Validar cálculo de juros em acordo de parcelamento
```

---

## 📦 MÓDULO FATURAMENTO

### Emissão de Notas Fiscais
**Funcionalidades Testadas:**
- ✅ NF-e (Nota Fiscal Eletrônica)
- ✅ NFS-e (Nota Fiscal de Serviços)
- ✅ Cálculo automático de impostos (ICMS, IPI, PIS, COFINS)
- ✅ Integração com SEFAZ
- ✅ Cancelamento e carta de correção

**Regras Tributárias Validadas:**
1. **ICMS:** Alíquota varia por estado (7% a 18%)
2. **IPI:** Aplicado em produtos industrializados
3. **PIS/COFINS:** Regime cumulativo vs não-cumulativo
4. **Substituição Tributária (ST):** Validação de CSOSN

**Casos de Teste Críticos:**
```
CT-FAT-001: Validar cálculo de ICMS interestadual (difal)
CT-FAT-002: Validar emissão de NF-e com substituição tributária
CT-FAT-003: Validar envio ao SEFAZ e recebimento de protocolo
CT-FAT-004: Validar carta de correção eletrônica (CC-e)
CT-FAT-005: Validar cancelamento dentro de 24h
```

### Pedidos de Venda
**Funcionalidades Testadas:**
- ✅ Cadastro de pedidos
- ✅ Validação de estoque disponível
- ✅ Cálculo de frete (CIF/FOB)
- ✅ Integração com comissões de vendedores

---

## 📊 MÓDULO SUPRIMENTOS

### Controle de Estoque
**Funcionalidades Testadas:**
- ✅ Movimentações de entrada/saída
- ✅ Inventário rotativo
- ✅ Ponto de pedido (estoque mínimo)
- ✅ Curva ABC de produtos
- ✅ Métodos de avaliação: PEPS, UEPS, Custo Médio

**Regras de Negócio Validadas:**
1. **PEPS (Primeiro a Entrar, Primeiro a Sair):** Obrigatório fiscalmente
2. **Estoque Negativo:** Bloqueio ou alerta configurável
3. **Reserva de Estoque:** Validar que pedidos reservam quantidade

**Casos de Teste Críticos:**
```
CT-SUP-001: Validar cálculo de custo médio ponderado
CT-SUP-002: Validar bloqueio de venda com estoque insuficiente
CT-SUP-003: Validar geração de ordem de compra automática (ponto de pedido)
CT-SUP-004: Validar inventário com ajuste de diferenças
```

### Compras
**Funcionalidades Testadas:**
- ✅ Cotação de preços (múltiplos fornecedores)
- ✅ Ordem de compra
- ✅ Recebimento de mercadorias
- ✅ Devolução ao fornecedor

---

## 🔍 CENÁRIOS DE INTEGRAÇÃO ENTRE MÓDULOS

### Fluxo Completo: Venda → Faturamento → Financeiro
```
1. Pedido de Venda (Faturamento)
   ↓
2. Reserva de Estoque (Suprimentos)
   ↓
3. Emissão de NF-e (Faturamento)
   ↓
4. Baixa de Estoque (Suprimentos)
   ↓
5. Geração de Título a Receber (Financeiro)
   ↓
6. Lançamento Contábil (Contabilidade)
```

**Casos de Teste de Integração:**
```
CT-INT-001: Validar que pedido de venda gera título a receber correto
CT-INT-002: Validar que NF-e emitida baixa estoque automaticamente
CT-INT-003: Validar lançamento contábil completo de uma venda
```

---

## 🐛 EXEMPLOS DE BUGS REAIS ENCONTRADOS

### BUG-001: Cálculo Incorreto de ICMS ST
**Módulo:** Faturamento  
**Severidade:** Alta  
**Descrição:** NF-e com substituição tributária calculava ICMS ST com base de cálculo errada  
**Impacto:** Notas sendo rejeitadas pela SEFAZ (erro: "base de cálculo divergente")  
**Causa Raiz:** Fórmula não considerava IPI na composição da base

### BUG-002: Estoque Negativo Permitido
**Módulo:** Suprimentos  
**Severidade:** Crítica  
**Descrição:** Sistema permitia venda mesmo com estoque zerado  
**Impacto:** Vendas sem produto para entregar, comprometendo prazo  
**Causa Raiz:** Validação de estoque rodava APÓS confirmação do pedido

### BUG-003: Duplicação de Lançamento Contábil
**Módulo:** Financeiro  
**Severidade:** Alta  
**Descrição:** Baixa de título gerava 2 lançamentos contábeis idênticos  
**Impacto:** Balancete descasado, auditoria bloqueada  
**Causa Raiz:** Trigger de banco de dados executando 2x

---

## 📚 FERRAMENTAS E CONCEITOS ERP

### Conhecimento Técnico
- ✅ **SEFAZ/NF-e:** WebServices, XML, schemas XSD
- ✅ **CNAB:** Arquivos bancários 240/400
- ✅ **SPED:** Fiscal, Contábil, Contribuições
- ✅ **Impostos:** ICMS, IPI, PIS, COFINS, ISS
- ✅ **Contabilidade:** Plano de contas, partidas dobradas, DRE

### Sistemas Conhecidos
- **ERPNext** (open-source) - usado em testes
- **TOTVS Protheus** - familiaridade com estrutura
- **SAP ERP** - conceitos de módulos MM, SD, FI

---

## 🎯 APLICAÇÃO EM AUTOMAÇÃO DE TESTES

### Como Validar Módulos em Testes Automatizados

**1. Financeiro:**
```javascript
// Validar cálculo de juros
const titulo = await buscarTitulo('0001/2025');
const juros = calcularJuros(titulo.valor, titulo.diasAtraso);
assert.equal(juros, titulo.jurosCalculados);
```

**2. Faturamento:**
```javascript
// Validar cálculo de ICMS
const nfe = await emitirNotaFiscal(pedido);
const icmsEsperado = pedido.valor * 0.18; // 18% ICMS
assert.equal(nfe.impostos.icms, icmsEsperado);
```

**3. Suprimentos:**
```javascript
// Validar reserva de estoque
const estoque = await consultarEstoque('PROD001');
assert.isTrue(estoque.disponivel >= pedido.quantidade);
```

---

## 📊 RESUMO DE EXPERTISE

| Módulo | Nível | Casos de Teste |
|--------|-------|----------------|
| Financeiro | ⭐⭐⭐⭐ | 15+ |
| Faturamento | ⭐⭐⭐⭐⭐ | 20+ |
| Suprimentos | ⭐⭐⭐⭐ | 12+ |
| Contabilidade | ⭐⭐⭐ | 8+ |

**Total de Casos de Teste em Módulos ERP:** 55+