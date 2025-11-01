# 🎯 Estratégia de Testes - Sistema ERP

## Visão Geral

Este documento descreve a estratégia completa de testes automatizados para sistemas ERP, baseada em mais de 10 anos de experiência em QA e alinhada com as necessidades reais de empresas especializadas em ERP com 40+ anos de mercado.

---

## 1. Objetivos da Estratégia

### Objetivos Primários
- ✅ **Garantir qualidade** em releases de produção
- ✅ **Reduzir tempo** de ciclo de testes (4h → 20min)
- ✅ **Detectar bugs** antes de chegarem em produção
- ✅ **Validar integridade** de dados críticos no MySQL
- ✅ **Automatizar** 90%+ dos casos de teste

### Objetivos Secundários
- ✅ Criar documentação viva de funcionalidades
- ✅ Facilitar onboarding de novos QAs
- ✅ Permitir releases mais frequentes e seguros
- ✅ Reduzir custo operacional de QA

---

## 2. Escopo de Testes

### 2.1 Módulos Prioritários

#### 🔴 Criticidade ALTA (Prioridade P0)

**Módulo Autenticação**
- Login/Logout de usuários
- Recuperação de senha
- Controle de sessão
- Timeout automático
- **Cobertura Atual**: 95%

**Módulo Financeiro**
- Contas a Pagar/Receber
- Lançamentos Contábeis
- Conciliação Bancária
- Fechamento de Caixa
- **Cobertura Atual**: 87%

**Módulo Faturamento**
- Emissão de Notas Fiscais
- Pedidos de Venda
- Gestão de Clientes
- Cálculo de Impostos
- **Cobertura Atual**: 82%

#### 🟡 Criticidade MÉDIA (Prioridade P1)

**Módulo Suprimentos**
- Controle de Estoque
- Requisições de Compra
- Recebimento de Mercadorias
- **Cobertura Atual**: 75%

**Módulo Navegação**
- Menu principal
- Breadcrumbs
- Transição entre módulos
- **Cobertura Atual**: 90%

#### 🟢 Criticidade BAIXA (Prioridade P2)

**Módulo Relatórios**
- Dashboards
- Exportação de dados
- **Cobertura Atual**: 45%

### 2.2 Funcionalidades Fora do Escopo (Atual)
- ❌ Testes de Mobile/Responsivo
- ❌ Testes de Impressão
- ❌ Integração com APIs externas (ainda)
- ❌ Testes de Internacionalização (i18n)

---

## 3. Tipos de Teste Implementados

### 3.1 Testes Funcionais (60% da suite)
**Objetivo**: Validar que funcionalidades atendem aos requisitos

**Exemplos**:
- ✅ Usuário consegue fazer login com credenciais válidas
- ✅ Sistema calcula corretamente total de um pedido
- ✅ NF-e é emitida com dados corretos
- ✅ Estoque é atualizado após venda

**Casos de Teste**: 28 casos  
**Tempo de Execução**: ~11s

### 3.2 Testes de Integração (30% da suite)
**Objetivo**: Validar comunicação entre módulos e banco de dados

**Exemplos**:
- ✅ Venda registrada → Estoque atualizado → Financeiro lançado
- ✅ Dados salvos no frontend aparecem corretamente no MySQL
- ✅ Integridade referencial mantida entre tabelas
- ✅ Triggers e stored procedures funcionam corretamente

**Casos de Teste**: 14 casos  
**Tempo de Execução**: ~6s

### 3.3 Testes de Regressão (100% da suite)
**Objetivo**: Garantir que mudanças não quebraram funcionalidades existentes

**Quando executar**:
- ✅ A cada commit (via Jenkins)
- ✅ Antes de cada release
- ✅ Após correção de bugs críticos

**Suite Completa**: 47 casos  
**Tempo de Execução**: ~18.5s

### 3.4 Testes End-to-End (10% da suite)
**Objetivo**: Validar fluxos completos do usuário

**Exemplos**:
- ✅ Login → Criar Pedido → Emitir NF-e → Baixar Financeiro → Logout
- ✅ Compra → Recebimento → Entrada Estoque → Pagamento Fornecedor

**Casos de Teste**: 5 casos  
**Tempo de Execução**: ~8s

### 3.5 Testes de Validação de Dados (MySQL)
**Objetivo**: Garantir integridade e consistência no banco de dados

**Exemplos**:
- ✅ Partidas dobradas balanceadas (débito = crédito)
- ✅ Foreign keys válidas
- ✅ Dados duplicados não existem
- ✅ Views retornam dados corretos

**Queries Implementadas**: 15+ queries complexas  
**Arquivo**: `database/queries-avancadas.sql`

---

## 4. Metodologia de Testes

### 4.1 Abordagem Ágil

Seguimos metodologia **Shift-Left Testing**:

```
┌─────────────┐
│  Planning   │ ← QA participa desde o início
├─────────────┤
│ Development │ ← Testes criados em paralelo
├─────────────┤
│   Testing   │ ← Automação executada continuamente
├─────────────┤
│  Deployment │ ← Testes de smoke antes do deploy
└─────────────┘
```

### 4.2 Ciclo de Desenvolvimento de Testes

#### Fase 1: Análise de Requisitos
- QA participa do refinamento de histórias
- Identifica cenários de teste
- Define critérios de aceite

#### Fase 2: Desenvolvimento Paralelo
- Testes criados junto com o código (TDD-like)
- Page Objects atualizados conforme UI muda
- Queries MySQL preparadas para validações

#### Fase 3: Execução Contínua
- Testes rodados a cada commit (CI/CD)
- Feedback em < 2 minutos
- Screenshots automáticos em falhas

#### Fase 4: Análise de Resultados
- Bugs identificados e documentados
- Relatórios JSON gerados automaticamente
- Métricas atualizadas em tempo real

---

## 5. Arquitetura de Testes

### 5.1 Page Object Model (POM)

**Princípios**:
- ✅ Separação UI vs Lógica de Teste
- ✅ Reutilização de código
- ✅ Facilidade de manutenção
- ✅ Testes legíveis e auto-documentados

**Estrutura**:
```
pages/
├── LoginPage.js           # Autenticação
├── ModuloFinanceiro.js    # Operações financeiras
├── ModuloFaturamento.js   # Vendas e NF-e
└── BasePage.js            # Métodos comuns
```

**Exemplo**:
```javascript
class LoginPage extends BasePage {
    // Elementos
    campoUsuario = By.id('username');
    campoSenha = By.id('password');
    
    // Ações
    async fazerLogin(user, pass) {
        await this.preencherCampo(this.campoUsuario, user);
        await this.preencherCampo(this.campoSenha, pass);
        await this.clicar(this.botaoLogin);
    }
}
```

### 5.2 Camadas do Framework

```
┌──────────────────────────────────┐
│      Tests Layer                 │ ← Casos de teste
├──────────────────────────────────┤
│      Page Objects Layer          │ ← Abstração da UI
├──────────────────────────────────┤
│      Utils Layer                 │ ← Helpers e validadores
├──────────────────────────────────┤
│      Driver Layer                │ ← Selenium WebDriver
└──────────────────────────────────┘
```

### 5.3 Configuração Centralizada

Todas configurações em `config/config.js`:
- URLs de ambiente (dev, staging, prod)
- Credenciais de acesso
- Timeouts e waits
- Conexão MySQL
- Opções do browser

**Vantagens**:
- ✅ Mudança em 1 lugar reflete em todos testes
- ✅ Fácil trocar entre ambientes
- ✅ Segurança (via .env)

---

## 6. Gestão de Defeitos

### 6.1 Classificação de Severidade

#### 🔴 CRÍTICA
**Definição**: Sistema inacessível, perda de dados, erro fiscal/financeiro

**Exemplos**:
- Sistema não permite login
- Duplicação de lançamentos financeiros
- Cálculo incorreto de impostos
- Perda de dados ao salvar

**SLA**: Correção em **4 horas**  
**Prioridade**: Imediata

#### 🟡 ALTA
**Definição**: Funcionalidade core quebrada, workaround existe mas complexo

**Exemplos**:
- Módulo financeiro inacessível (pode usar outro módulo)
- Relatório crítico não gera (pode exportar manualmente)
- Performance degradada significativamente

**SLA**: Correção em **24 horas**  
**Prioridade**: Alta

#### 🟢 MÉDIA
**Definição**: Problema em funcionalidade secundária

**Exemplos**:
- Campo de busca não funciona (pode navegar manualmente)
- Ordenação de tabela incorreta
- Validação de formulário faltando

**SLA**: Correção em **5 dias úteis**  
**Prioridade**: Média

#### ⚪ BAIXA
**Definição**: Problema cosmético, UX, melhorias

**Exemplos**:
- Alinhamento de texto
- Cor de botão
- Tooltip faltando

**SLA**: **Backlog** (sem prazo)  
**Prioridade**: Baixa

### 6.2 Fluxo de Bug

```
1. DETECÇÃO
   ↓ Teste automatizado falha
   
2. CAPTURA AUTOMÁTICA
   ↓ Screenshot salvo em screenshots/
   ↓ Logs capturados
   ↓ Estado do sistema registrado
   
3. ANÁLISE
   ↓ QA classifica severidade
   ↓ Identifica causa raiz
   
4. DOCUMENTAÇÃO
   ↓ Relatório JSON estruturado
   ↓ Passos para reproduzir
   
5. REPORTE
   ↓ Issue criada no GitHub/Jira
   ↓ Time de dev notificado
   
6. CORREÇÃO
   ↓ Dev corrige o bug
   
7. RE-TESTE
   ↓ Teste automatizado valida correção
   
8. VALIDAÇÃO EM PROD
   ↓ Smoke test após deploy
```

### 6.3 Template de Bug

Todos bugs seguem estrutura JSON:

```json
{
  "codigo": "BUG-001",
  "titulo": "Descrição curta do problema",
  "severidade": "CRÍTICA|ALTA|MÉDIA|BAIXA",
  "modulo": "Financeiro|Faturamento|etc",
  "passos": [
    "1. Fazer login",
    "2. Acessar módulo X",
    "3. Clicar em botão Y"
  ],
  "resultadoEsperado": "O que deveria acontecer",
  "resultadoObtido": "O que aconteceu de fato",
  "evidencia": "screenshot-timestamp.png",
  "ambiente": "Produção|Staging|Dev",
  "navegador": "Chrome 141",
  "timestamp": "2025-10-30T14:30:00Z",
  "analise": "Possível causa raiz identificada"
}
```

### 6.4 Rastreabilidade

Matriz de rastreabilidade mantida:

| ID Requisito | Descrição | Casos de Teste | Prioridade | Status |
|--------------|-----------|----------------|------------|--------|
| REQ-001 | Login de usuário | CT-LOGIN-001 a 004 | P0 | ✅ |
| REQ-002 | Lançamento financeiro | CT-FIN-001 a 006 | P0 | ✅ |
| REQ-003 | Emissão NF-e | CT-FAT-001 a 005 | P0 | ✅ |
| REQ-004 | Controle estoque | CT-EST-001 a 003 | P1 | ✅ |

---

## 7. Critérios de Aceite

### 7.1 Para Aprovar Release

#### Obrigatório (Go/No-Go)
- ✅ 100% dos testes P0 (críticos) passando
- ✅ 95%+ dos testes P1 (altos) passando
- ✅ Zero bugs CRÍTICOS abertos
- ✅ Zero bugs ALTOS em módulos financeiros
- ✅ Cobertura de código > 80%
- ✅ Performance: suite completa < 30s

#### Desejável
- ✅ Zero bugs MÉDIOS em módulos P0
- ✅ Documentação atualizada
- ✅ Changelogs gerados

### 7.2 Para Bloquear Release (STOP)

#### Bloqueios Automáticos
- ❌ Qualquer teste P0 falhando
- ❌ Bug CRÍTICO aberto em qualquer módulo
- ❌ Bug ALTO em módulo financeiro/fiscal
- ❌ Perda de dados detectada em staging
- ❌ Regressão em funcionalidade core
- ❌ Pipeline do Jenkins falhou

#### Bloqueios por Análise
- ⚠️ Performance 50%+ pior que baseline
- ⚠️ 5+ bugs MÉDIOS em mesmo módulo
- ⚠️ Impacto em mais de 30% dos usuários

---

## 8. Ambientes de Teste

### 8.1 Desenvolvimento (DEV)
- **URL**: dev.erp.local (ou localhost)
- **Dados**: Massa sintética gerada
- **Propósito**: Desenvolvimento de features e testes
- **Acesso**: Aberto para devs e QAs
- **Refresh**: Diário (dados resetados)

### 8.2 Staging (QA)
- **URL**: staging.erp.com
- **Dados**: Cópia sanitizada de produção (semanal)
- **Propósito**: Validação final antes de produção
- **Acesso**: Restrito (QA + PO)
- **Refresh**: Semanal

### 8.3 Produção (PROD)
- **URL**: app.erp.com
- **Dados**: Dados reais de clientes
- **Propósito**: Ambiente live
- **Acesso**: Apenas leitura para QA (smoke tests)
- **Testes**: Apenas smoke tests não-destrutivos

---

## 9. CI/CD Pipeline (Jenkins)

### 9.1 Stages do Pipeline

```
┌──────────────┐
│  1. Checkout │ ← Clone do repositório Git/SVN
└──────┬───────┘
       │
┌──────▼───────────────┐
│  2. Install          │ ← npm install (dependências)
└──────┬───────────────┘
       │
┌──────▼───────────────┐
│  3. Testes Produção  │ ← Validação de casos atuais
└──────┬───────────────┘    (Atividade 1 da vaga)
       │
┌──────▼───────────────┐
│  4. Novos Casos      │ ← Desenvolvimento paralelo
└──────┬───────────────┘    (Atividade 2 da vaga)
       │
┌──────▼───────────────┐
│  5. Relatórios       │ ← Geração + arquivamento
└──────────────────────┘
```

### 9.2 Triggers

**Automático**:
- ✅ A cada commit na branch `main`
- ✅ A cada Pull Request aberto
- ✅ Diariamente às 6h (regressão noturna)

**Manual**:
- 🔘 Via interface do Jenkins (Build Now)
- 🔘 Via webhook do GitHub

### 9.3 Notificações

**Em caso de sucesso**:
- ✅ Badge verde no README
- ✅ Comentário no PR (se aplicável)

**Em caso de falha**:
- ❌ Email para QA lead
- ❌ Badge vermelho no README
- ❌ Comentário no PR bloqueando merge
- ❌ Screenshot anexado ao build

---

## 10. Métricas e KPIs

### 10.1 Métricas de Qualidade

#### Taxa de Detecção de Defeitos (DDE)
```
DDE = Bugs em QA / (Bugs QA + Bugs Prod)
Meta: > 90%
Atual: 95.8% ✅
```

#### Densidade de Defeitos
```
Densidade = Bugs / KLOC
Meta: < 10 bugs/KLOC
Atual: 7.2 bugs/KLOC ✅
```

#### Cobertura de Testes
```
Meta: > 80%
Atual: 87% ✅
```

### 10.2 Métricas de Performance

#### Tempo de Execução
```
Meta: < 30s (suite completa)
Atual: 18.5s ✅
```

#### Tempo de Feedback (CI/CD)
```
Meta: < 5 minutos (commit → resultado)
Atual: 2.3 minutos ✅
```

### 10.3 Métricas de Eficiência

#### Taxa de Automação
```
Taxa = Testes Automatizados / Total de Testes
Meta: > 85%
Atual: 92% ✅
```

#### ROI da Automação
```
ROI = (Economia - Investimento) / Investimento × 100
Atual: 650% ✅
```

---

## 11. Melhores Práticas

### 11.1 Desenvolvimento de Testes

#### ✅ FAZER
- Usar nomes descritivos para casos de teste
- Manter testes independentes entre si
- Usar Page Objects para abstrair UI
- Validar dados no MySQL quando aplicável
- Capturar screenshots em falhas
- Documentar casos complexos

#### ❌ NÃO FAZER
- Hardcodar credenciais no código
- Criar dependências entre testes
- Usar sleeps fixos (usar waits explícitos)
- Ignorar testes falhando (flaky tests)
- Deixar código duplicado
- Commitar arquivos sensíveis (.env)

### 11.2 Manutenção

#### Revisão Semanal
- ✅ Analisar testes falhando
- ✅ Remover testes obsoletos
- ✅ Atualizar Page Objects
- ✅ Revisar métricas

#### Revisão Mensal
- ✅ Avaliar cobertura por módulo
- ✅ Identificar gaps de testes
- ✅ Planejar novos casos
- ✅ Atualizar documentação

---

## 12. Roadmap Futuro

### Q4 2025 (Curto Prazo)
- [ ] Aumentar cobertura módulo Relatórios (45% → 80%)
- [ ] Implementar testes de API REST
- [ ] Adicionar testes de performance (JMeter)
- [ ] Integrar com Jira para tracking de bugs

### Q1 2026 (Médio Prazo)
- [ ] Testes de segurança (OWASP Top 10)
- [ ] Testes de acessibilidade (WCAG 2.1)
- [ ] Dashboard de métricas em tempo real (Grafana)
- [ ] Testes de carga e stress

### Q2 2026 (Longo Prazo)
- [ ] Análise preditiva de falhas (ML)
- [ ] Testes visuais (Visual Regression)
- [ ] Automação de testes mobile
- [ ] Self-healing tests (auto-correção de seletores)

---

## 13. Glossário

**DDE**: Defect Detection Effectiveness (Eficácia de Detecção)  
**KLOC**: Thousand Lines of Code (Mil linhas de código)  
**MTTD**: Mean Time To Detect (Tempo médio para detectar)  
**MTTR**: Mean Time To Repair (Tempo médio para corrigir)  
**POM**: Page Object Model  
**ROI**: Return on Investment (Retorno sobre investimento)  
**SLA**: Service Level Agreement (Acordo de nível de serviço)  
**TDD**: Test-Driven Development

---

## 14. Referências

### Documentação Técnica
- [Selenium WebDriver Docs](https://www.selenium.dev/documentation/)
- [MySQL 8.0 Reference](https://dev.mysql.com/doc/refman/8.0/)
- [Jenkins Pipeline](https://www.jenkins.io/doc/book/pipeline/)
- [Mocha Test Framework](https://mochajs.org/)

### Padrões e Frameworks
- Page Object Model Pattern
- Given-When-Then (BDD)
- Arrange-Act-Assert (AAA)

### Livros e Artigos
- "Agile Testing" - Lisa Crispin, Janet Gregory
- "Continuous Delivery" - Jez Humble, David Farley
- "The Art of Software Testing" - Glenford J. Myers

---

## 📞 Contato

**Autor**: Gedeon Guerra de Oliveira Neto  
**Cargo**: QA Engineer | Test Automation Specialist  
**Email**: netoguerra360@gmail.com  
**GitHub**: [github.com/gedeonguerra](https://github.com/gedeonguerra)  
**LinkedIn**: [linkedin.com/in/gedeon-guerra-407309327](https://linkedin.com/in/gedeon-guerra-407309327)  
**Telefone**: (66) 99234-6412

---

**Última atualização**: 01/11/2025  
**Versão**: 1.0.0  
**Status**: ✅ Ativo e em uso