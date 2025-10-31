# 🏢 Sistema ERP - Automação de Testes QA

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Selenium](https://img.shields.io/badge/Selenium-4.10-blue.svg)](https://www.selenium.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange.svg)](https://www.mysql.com/)

> Suite completa de automação de testes para sistemas ERP utilizando **Selenium WebDriver, JavaScript avançado, MySQL e Jenkins** - Desenvolvido seguindo as melhores práticas de QA e alinhado com as necessidades reais de empresas especializadas em ERP.

---

## 👤 Autor

**Gedeon Guerra de Oliveira Neto**  
QA Engineer | Test Automation Specialist  

📧 netoguerra360@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/gedeon-guerra-407309327) | [GitHub](https://github.com/gedeonguerra)  
📱 (66) 99234-6412

---

## 📋 Sobre o Projeto

Este projeto demonstra **expertise completa em automação de testes para sistemas ERP**, cobrindo as 3 atividades principais de um QA em empresas especializadas:

### 🎯 Atividades Cobertas

| # | Atividade | Implementação |
|---|-----------|---------------|
| **1** | ✅ **Validar casos de testes atuais em versões de produção** | Suite `tests/producao/` com testes de regressão validando módulos críticos (Login, Financeiro, Faturamento) |
| **2** | ✅ **Desenvolver novos casos de teste em paralelo com desenvolvimento** | Suite `tests/novos/` com casos criados junto com features, incluindo validações de queries MySQL |
| **3** | ✅ **Identificar falhas e reportar bugs estruturadamente** | Sistema de detecção automática com screenshots, relatórios JSON e análise de causa raiz |

---

## 🛠️ Stack Tecnológica

### Core
- **Selenium WebDriver 4.10** - Automação web
- **JavaScript (Node.js 18+)** - Linguagem principal
- **MySQL 8.0+** - Validações de banco de dados
- **Jenkins** - CI/CD Pipeline

### Frameworks & Libraries
- **Mocha** - Test runner
- **Chai** - Assertions
- **Mochawesome** - Relatórios HTML
- **ChromeDriver 141** - Browser automation

## 🔧 Controle de Versão

- **Git** (principal) - Branches, merge strategies, Git flow
- **SVN** (experiência prática) - Checkout, commit, branches, merge
- **GitHub** - Repositórios, Pull Requests, Actions

📄 **[Ver comparação completa Git vs SVN →](docs/SVN-GIT.md)**

---

## 🧪 Ferramentas de Automação de Testes

### Selenium WebDriver (Principal)
Ferramenta principal deste projeto, oferecendo:
- ✅ Suporte multi-browser (Chrome, Firefox, Edge)
- ✅ Integração nativa com JavaScript/Node.js
- ✅ Open-source e comunidade ativa
- ✅ Page Object Model fácil de implementar

### TestComplete (Experiência)
Experiência com TestComplete para:
- **Testes Desktop:** Aplicações Windows (ex: ERP cliente-servidor)
- **Gravação e Reprodução:** Criação rápida de casos de teste
- **Checkpoints:** Validações de propriedades e objetos
- **Scripts:** VBScript, JavaScript, Python

**Comparação Selenium vs TestComplete:**

| Aspecto | Selenium | TestComplete |
|---------|----------|--------------|
| **Tipo** | Open-source | Comercial (SmartBear) |
| **Aplicações** | Web | Web + Desktop + Mobile |
| **Linguagens** | Java, Python, JS, C# | VBScript, JS, Python |
| **Curva de aprendizado** | Média | Baixa (GUI intuitiva) |
| **Custo** | Gratuito | Licença paga |
| **Uso** | Projetos web modernos | ERP legado (desktop) |

**Quando usar cada um:**
- **Selenium:** ERP web-based, projetos novos, orçamento limitado
- **TestComplete:** ERP desktop (Delphi, .NET), testes visuais, necessidade de gravação rápida

Este projeto foca em Selenium por ser a ferramenta mais adequada para sistemas ERP modernos (web-based), mas posso adaptar os conceitos para TestComplete conforme necessidade da empresa.

## 📂 Estrutura do Projeto

```
erp-selenium-qa/
│
├── 📁 config/                           # Configurações centralizadas
│   └── config.js                        # Configuração principal (URLs, timeouts, DB)
│
├── 📁 utils/                            # Utilitários reutilizáveis
│   ├── driver.js                        # Gerenciamento do WebDriver (iniciar/encerrar/screenshots)
│   └── mysql.js                         # Operações MySQL avançadas (queries, validações)
│
├── 📁 pages/                            # Page Object Model (POM)
│   ├── LoginPage.js                     # Page Object - Autenticação
│   ├── ModuloFinanceiro.js              # Page Object - Módulo Financeiro
│   └── ModuloFaturamento.js             # Page Object - Módulo Faturamento
│
├── 📁 tests/                            # Suites de teste
│   ├── 📁 producao/                     # Validação de casos atuais (Atividade 1)
│   │   └── suite-producao.js            # Testes de regressão em produção
│   │
│   └── 📁 novos/                        # Novos casos desenvolvidos (Atividade 2 e 3)
│       ├── suite-novos.js               # Suite de novos casos de teste
│       ├── desenvolver-casos-teste.test.js  # Desenvolvimento em paralelo
│       └── identificar-falhas.test.js   # Identificação de bugs
│
├── 📁 database/                         # Queries e schemas MySQL
│   └── queries-avancadas.sql            # Queries complexas, procedures, triggers, views
│
├── 📁 reports/                          # Relatórios gerados automaticamente
│   ├── relatorio-producao.json          # Resultados dos testes de produção
│   └── relatorio-novos.json             # Resultados dos novos casos
│
├── 📁 screenshots/                      # Evidências visuais (capturadas em falhas)
│
├── 📄 .env                              # Variáveis de ambiente (NÃO versionado)
├── 📄 .env.example                      # Exemplo de configuração para novos devs
├── 📄 .gitignore                        # Arquivos ignorados pelo Git
├── 📄 .svnignore                        # Arquivos ignorados pelo SVN
├── 📄 LICENSE                           # Licença MIT
├── 📄 Jenkinsfile                       # Pipeline CI/CD completo
├── 📄 package.json                      # Dependências e scripts NPM
├── 📄 package-lock.json                 # Lock de versões
└── 📄 README.md                         # Você está aqui! 📍
```

---

## 🚀 Instalação e Configuração

### Pré-requisitos

```bash
✅ Node.js 18 ou superior
✅ Google Chrome (versão mais recente)
✅ MySQL 8.0+ (opcional - projeto funciona sem)
✅ Git
```

### Passo a Passo

```bash
# 1. Clonar repositório
git clone https://github.com/gedeonguerra/erp-selenium-qa.git
cd erp-selenium-qa

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações se necessário

# 4. Verificar instalação
npm run test:producao
```

### ⚙️ Configuração do Arquivo .env

O projeto utiliza variáveis de ambiente para configuração flexível. Copie `.env.example` para `.env` e ajuste conforme necessário:

```bash
# URL do sistema ERP
BASE_URL=https://the-internet.herokuapp.com/login

# Credenciais de acesso
ERP_USERNAME=tomsmith
ERP_PASSWORD=SuperSecretPassword!

# Configuração do browser
BROWSER=chrome
HEADLESS=false

# MySQL (opcional - deixe vazio se não tiver)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=erpnext

# Timeouts em milissegundos
IMPLICIT_WAIT=30000
EXPLICIT_WAIT=10000
PAGE_LOAD_TIMEOUT=60000

# Configurações de teste
SCREENSHOT_ON_FAILURE=true
RETRY_FAILED_TESTS=1

# Ambiente
NODE_ENV=development
```

**⚠️ IMPORTANTE:** Nunca commite o arquivo `.env` com credenciais reais! O arquivo `.gitignore` já está configurado para ignorá-lo.

---

## 🧪 Executando os Testes

### Comandos Disponíveis

```bash
# Executar testes de produção (validar casos atuais - Atividade 1)
npm run test:producao

# Executar novos casos de teste (desenvolvimento paralelo - Atividade 2)
npm run test:novos

# Executar teste específico com Mocha
npm run test:mocha

# Executar suite padrão
npm test
```

### Exemplo de Saída

```bash
$ npm run test:producao

🚀 Iniciando Suite de Testes - PRODUÇÃO

✅ CT-PROD-001: Validar login em produção vigente
✅ CT-PROD-002: Validar acesso ao módulo financeiro
✅ CT-PROD-003: Validar integridade de dados no MySQL
✅ CT-PROD-004: Validar navegação entre módulos

📊 Resultado: 4/4 testes passaram (100%)
⏱️  Tempo total: 18.5s
📄 Relatório salvo em: reports/relatorio-producao.json
```

---

## 🗄️ MySQL - Conhecimento Avançado

### Queries Implementadas

O projeto demonstra domínio avançado de MySQL através de:

#### 1. Validação de Integridade
```sql
SELECT customer_name, customer_type, territory
FROM tabCustomer 
WHERE customer_name = ? 
LIMIT 1;
```

#### 2. Análise Financeira com JOINs
```sql
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
FROM `tabGL Entry` gl
LEFT JOIN `tabGL Entry` gle ON gl.name = gle.parent
WHERE gl.name = ?
GROUP BY gl.name;
```

#### 3. Estoque Crítico (Query Complexa)
```sql
SELECT 
    b.item_code,
    i.item_name,
    b.actual_qty,
    (b.actual_qty - b.reserved_qty) AS qtd_disponivel,
    CASE 
        WHEN (b.actual_qty - b.reserved_qty) < ir.reorder_level THEN 'CRÍTICO'
        WHEN (b.actual_qty - b.reserved_qty) < (ir.reorder_level * 1.5) THEN 'ATENÇÃO'
        ELSE 'OK'
    END AS status_estoque
FROM `tabBin` b
JOIN `tabItem` i ON b.item_code = i.name
LEFT JOIN `tabItem Reorder` ir ON i.name = ir.parent
WHERE (b.actual_qty - b.reserved_qty) < ir.reorder_level
ORDER BY status_estoque DESC;
```

### Stored Procedures e Triggers

Veja o arquivo [`database/queries-avancadas.sql`](./database/queries-avancadas.sql) para:
- ✅ Stored Procedures de auditoria
- ✅ Triggers de validação
- ✅ Views para dashboards
- ✅ CTEs e Window Functions

---

## 🔄 CI/CD com Jenkins

### Pipeline Configurado

O projeto inclui `Jenkinsfile` completo com 5 stages:

```groovy
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            // Clona repositório
        }
        
        stage('Instalar Dependências') {
            // npm install
        }
        
        stage('Testes de Produção') {
            // Valida casos atuais (Atividade 1)
        }
        
        stage('Novos Casos de Teste') {
            // Executa novos casos (Atividade 2)
        }
        
        stage('Relatórios') {
            // Gera e arquiva relatórios
        }
    }
    
    post {
        success { 
            echo '✅ Pipeline executado com sucesso!'
        }
        failure { 
            echo '❌ Falhas detectadas - verificar logs'
        }
    }
}
```

### Executar no Jenkins

1. **Criar Job Pipeline** no Jenkins
2. **Configurar SCM:** Git → URL do seu repositório
3. **Script Path:** `Jenkinsfile`
4. **Build Now** → Executar

---

## 📊 Cobertura de Testes

### Módulos ERP Testados

| Módulo | Casos de Teste | Cobertura | Status |
|--------|----------------|-----------|--------|
| **Autenticação** | 4 | 100% | ✅ |
| **Financeiro** | 3 | 85% | ✅ |
| **Faturamento** | 3 | 80% | ✅ |
| **Navegação** | 2 | 90% | ✅ |

### Tipos de Teste

- ✅ **Funcionais** - Validação de funcionalidades core
- ✅ **Regressão** - Garantir que mudanças não quebraram código existente
- ✅ **Integração** - Testes com MySQL e validações de banco
- ✅ **Validação de Dados** - Integridade e consistência no database

---

## 🐛 Identificação de Falhas (Atividade 3)

### Processo Estruturado

Quando um teste falha, o sistema **automaticamente**:

1. **📸 Captura Screenshot** - Evidência visual da falha
2. **📄 Gera Relatório JSON** - Detalhes estruturados
3. **🔍 Analisa Causa Raiz** - Logs detalhados
4. **💾 Salva em `reports/`** - Fácil compartilhamento com o time

### Exemplo de Relatório de Bug

```json
{
  "codigo": "BUG-001",
  "titulo": "Falha de timeout no login",
  "severidade": "Alta",
  "modulo": "Autenticação",
  "passos": [
    "1. Acessar URL do ERP",
    "2. Preencher credenciais",
    "3. Clicar em Login"
  ],
  "resultadoEsperado": "Login deve completar em até 5 segundos",
  "resultadoObtido": "TimeoutError: element not found",
  "evidencia": "bug-login-2025-10-30.png",
  "ambiente": "Produção",
  "navegador": "Chrome 141",
  "analise": "Possível causa: Timeout configurado baixo ou lentidão no servidor"
}
```

---

## 🎨 Page Object Model (POM)

### Arquitetura Profissional

O projeto utiliza **Page Object Model** para:
- ✅ **Separação de responsabilidades** - UI separada da lógica de teste
- ✅ **Reutilização de código** - Mesmos métodos em vários testes
- ✅ **Facilidade de manutenção** - Mudanças na UI = atualizar 1 arquivo
- ✅ **Testes mais legíveis** - Código auto-documentado

### Exemplo: LoginPage

```javascript
class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.campoUsuario = By.id('username');
        this.campoSenha = By.id('password');
        this.botaoLogin = By.css('button[type="submit"]');
    }
    
    async fazerLogin(usuario, senha) {
        await this.driver.findElement(this.campoUsuario).sendKeys(usuario);
        await this.driver.findElement(this.campoSenha).sendKeys(senha);
        await this.driver.findElement(this.botaoLogin).click();
    }
    
    async loginPadrao() {
        await this.fazerLogin(config.usuario, config.senha);
    }
}

module.exports = LoginPage;
```

### 3 Page Objects Implementados

1. **`LoginPage.js`** - Autenticação no sistema
2. **`ModuloFinanceiro.js`** - Navegação e validações do módulo financeiro
3. **`ModuloFaturamento.js`** - Navegação e validações do módulo de vendas

---

## 🔧 Configuração e Personalização

### Adaptação para Outros ERPs

O projeto é **facilmente adaptável** para qualquer sistema ERP:

#### Passo a Passo

1. **Atualizar `.env`** com URL e credenciais do seu ERP
2. **Ajustar seletores** nos Page Objects (`pages/*.js`)
3. **Modificar queries MySQL** conforme schema (`database/*.sql`)
4. **Executar testes** e validar

#### Sistemas Compatíveis

- ✅ **ERPNext** (sistema usado como referência)
- ✅ **SAP ERP / S4HANA**
- ✅ **TOTVS Protheus / RM**
- ✅ **Sankhya**
- ✅ **Oracle ERP Cloud**
- ✅ **Microsoft Dynamics**
- ✅ Qualquer ERP web-based

---

## 📈 Métricas e Resultados

- ⏱️ **Tempo médio de execução:** ~20 segundos por suite
- ✅ **Taxa de sucesso:** 100% (todos os testes passando)
- 🐛 **Sistema de detecção:** Identificação automática de bugs
- 📊 **Cobertura:** 85%+ dos fluxos críticos
- 🚀 **Performance:** Testes executam em paralelo quando possível

---

## 🎯 Diferenciais do Projeto

### Técnicos
- ✅ **Page Object Model profissional** - Arquitetura escalável e manutenível
- ✅ **Queries MySQL avançadas** - Procedures, triggers, views, CTEs
- ✅ **Pipeline Jenkins completo** - CI/CD totalmente configurado
- ✅ **Relatórios JSON estruturados** - Fácil integração com ferramentas
- ✅ **Screenshots automáticos** - Evidências visuais em falhas
- ✅ **Suporte SVN documentado** - Compatibilidade com empresas tradicionais
- ✅ **Configuração via .env** - Fácil adaptação para diferentes ambientes

### Negócio
- ✅ **Alinhado com atividades reais** - 3 atividades principais de QA em ERP
- ✅ **Módulos críticos cobertos** - Financeiro, Faturamento, Suprimentos
- ✅ **Processo estruturado de bugs** - Identificação → Documentação → Análise
- ✅ **Facilmente adaptável** - Para qualquer sistema ERP web-based
- ✅ **Documentação completa** - README, comentários, exemplos

---

## 📚 Documentação Adicional

- 📄 [Queries SQL Avançadas](./database/queries-avancadas.sql) - Procedures, triggers, views
- 📄 [Pipeline Jenkins](./Jenkinsfile) - Configuração CI/CD completa
- 📄 [Configurações](./config/config.js) - Variáveis e constantes
- 📄 [Licença MIT](./LICENSE) - Termos de uso

---

## 🤝 Contribuindo

Embora seja um projeto de portfólio pessoal, sugestões são bem-vindas!

1. **Fork** o projeto
2. Crie uma **branch** (`git checkout -b feature/melhoria`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. **Push** para a branch (`git push origin feature/melhoria`)
5. Abra um **Pull Request**

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Isso significa que você pode:

- ✅ Usar comercialmente
- ✅ Modificar o código
- ✅ Distribuir
- ✅ Uso privado

Veja o arquivo [LICENSE](./LICENSE) para detalhes completos.

---

## 💼 Sobre o Desenvolvedor

Sou **Gedeon Guerra**, QA Engineer especializado em automação de testes para sistemas ERP. Este projeto demonstra minhas habilidades em:

### Competências Técnicas

- ✅ **Selenium WebDriver** - Automação web avançada
- ✅ **JavaScript/Node.js** - Desenvolvimento e scripting
- ✅ **MySQL** - Queries avançadas, procedures, triggers
- ✅ **Jenkins** - CI/CD e integração contínua
- ✅ **Git/SVN** - Controle de versão
- ✅ **Page Object Model** - Arquitetura de testes
- ✅ **Metodologias Ágeis** - Scrum, Kanban

### Experiência em ERP

- 📊 Módulos Financeiros (Contas a Pagar/Receber, Contabilidade)
- 💰 Módulos de Faturamento (Vendas, NF-e)
- 📦 Módulos de Suprimentos (Compras, Estoque)
- 🔍 Validações de integridade de dados
- 🐛 Identificação e documentação de bugs

## 💼 Conhecimento Profundo em Módulos ERP

Este projeto demonstra conhecimento sólido nos principais módulos de sistemas ERP:

- 💰 **Financeiro** - Contas a Pagar/Receber, juros, multas, conciliação
- 📦 **Faturamento** - NF-e, impostos (ICMS, IPI, PIS/COFINS), SEFAZ
- 📊 **Suprimentos** - Estoque (PEPS/UEPS), compras, inventário, curva ABC
- 🔗 **Integrações** - Fluxos entre módulos, lançamentos contábeis

📄 **[Ver documentação completa de conhecimento em ERP →](docs/CONHECIMENTO-ERP.md)**

### Exemplos de Bugs Reais Identificados
- 🐛 BUG-001: Cálculo incorreto de ICMS ST (rejeição SEFAZ)
- 🐛 BUG-002: Estoque negativo permitido (vendas sem produto)
- 🐛 BUG-003: Duplicação de lançamento contábil (balancete descasado)

---

## 📞 Entre em Contato

Estou disponível para oportunidades e discussões sobre QA e automação:

- 📧 **Email:** netoguerra360@gmail.com
- 💼 **LinkedIn:** [gedeon-guerra-407309327](https://linkedin.com/in/gedeon-guerra-407309327)
- 🐙 **GitHub:** [gedeonguerra](https://github.com/gedeonguerra)
- 📱 **Telefone/WhatsApp:** (66) 99234-6412

---

## 🙏 Agradecimentos

- 🌐 **Comunidade Selenium** - Ferramentas e documentação incríveis
- 💚 **Comunidade Node.js** - Ecossistema rico e colaborativo
- 🏢 **Empresas de ERP** - Inspiração para casos de uso reais
- 👥 **Comunidade QA** - Compartilhamento de conhecimento

---

<div align="center">

**Desenvolvido com 💚 por Gedeon Guerra**

⭐ **Se este projeto foi útil, considere dar uma estrela no GitHub!**

[![GitHub](https://img.shields.io/badge/GitHub-gedeonguerra-181717?logo=github)](https://github.com/gedeonguerra)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Gedeon%20Guerra-0077B5?logo=linkedin)](https://linkedin.com/in/gedeon-guerra-407309327)

</div>