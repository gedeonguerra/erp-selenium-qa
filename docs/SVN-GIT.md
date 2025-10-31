# 🔄 Controle de Versão: SVN e Git

## 📚 Experiência com Sistemas de Versionamento

### Git (Principal) - ⭐⭐⭐⭐⭐
Utilizado diariamente em projetos pessoais e profissionais.

**Operações Dominadas:**
- Branches e merge strategies (fast-forward, squash, rebase)
- Resolução de conflitos
- Git flow (feature, develop, release, hotfix)
- Cherry-pick e bisect para debugging
- Hooks (pre-commit, pre-push)
- Submodules

### SVN (Experiência Prática) - ⭐⭐⭐⭐
Experiência com SVN em ambientes corporativos e legados.

**Operações Dominadas:**
- Checkout, commit, update
- Branches e tags
- Merge e resolução de conflitos
- Lock de arquivos (necessário em ambientes SVN)
- Revert de mudanças

---

## 🔀 Comparação Git vs SVN

| Operação | Git | SVN | Diferença Principal |
|----------|-----|-----|---------------------|
| **Clonar repositório** | `git clone <url>` | `svn checkout <url>` | Git clona TODO o histórico, SVN apenas working copy |
| **Atualizar local** | `git pull` | `svn update` | Git merge automático, SVN atualiza direto |
| **Enviar mudanças** | `git push` | `svn commit` | Git precisa commit + push, SVN é direto |
| **Ver histórico** | `git log` | `svn log` | Git tem histórico local completo |
| **Criar branch** | `git checkout -b <nome>` | `svn copy trunk branches/<nome>` | Git é local e rápido, SVN cria no servidor |
| **Merge** | `git merge <branch>` | `svn merge <url>` | Git mais flexível com estratégias |
| **Ver diferenças** | `git diff` | `svn diff` | Mesma funcionalidade |
| **Desfazer mudanças** | `git reset` / `git revert` | `svn revert` | Git tem mais opções |

---

## 💼 SVN em Ambientes Corporativos ERP

### Por que Empresas de ERP Usam SVN?

1. **Legado:** Sistemas com 20-40 anos de código
2. **Controle Centralizado:** Importante para auditoria
3. **Lock de Arquivos:** Evita conflitos em arquivos binários (reports, imagens)
4. **Permissões Granulares:** Controle fino por pasta/arquivo
5. **Integração com Ferramentas Antigas:** IDEs antigas suportam SVN melhor

### Workflow Típico em QA com SVN
```bash
# 1. Checkout do projeto de testes
svn checkout http://svn.empresa.com/qa/testes-erp ~/projeto-qa
cd ~/projeto-qa

# 2. Atualizar antes de trabalhar (SEMPRE!)
svn update

# 3. Criar branch para nova feature de teste
svn copy http://svn.empresa.com/qa/testes-erp/trunk \
         http://svn.empresa.com/qa/testes-erp/branches/teste-modulo-financeiro \
         -m "Criando branch para novos testes do módulo financeiro"

# 4. Mudar para a branch
svn switch http://svn.empresa.com/qa/testes-erp/branches/teste-modulo-financeiro

# 5. Adicionar novos arquivos
svn add tests/novos/teste-financeiro-juros.js

# 6. Commit das mudanças
svn commit -m "Adiciona teste de cálculo de juros em títulos vencidos"

# 7. Merge de volta para trunk (após revisão)
svn switch http://svn.empresa.com/qa/testes-erp/trunk
svn merge http://svn.empresa.com/qa/testes-erp/branches/teste-modulo-financeiro
svn commit -m "Merge: novos testes do módulo financeiro"
```

---

## 🔧 Resolução de Conflitos em SVN

### Cenário Comum
Dois QAs editaram o mesmo arquivo de teste simultaneamente.
```bash
# Ao dar svn update, aparece conflito
svn update
# Output: C    tests/producao/suite-producao.js

# Ver diferenças
svn diff tests/producao/suite-producao.js

# Opções de resolução:
svn resolve --accept mine-full tests/producao/suite-producao.js  # Manter minha versão
svn resolve --accept theirs-full tests/producao/suite-producao.js  # Aceitar versão do servidor
svn resolve --accept working tests/producao/suite-producao.js  # Resolver manualmente

# Após resolver manualmente:
# 1. Editar arquivo removendo marcadores <<<< ==== >>>>
# 2. Testar que funciona
# 3. Marcar como resolvido
svn resolve --accept working tests/producao/suite-producao.js
svn commit -m "Resolve conflito em suite-producao.js"
```

---

## 🚀 Migração SVN → Git (Conhecimento Prático)

### Quando Necessário Migrar
Empresas modernizando infraestrutura de testes.
```bash
# 1. Clonar repositório SVN mantendo histórico
git svn clone http://svn.empresa.com/qa/testes-erp \
              --trunk=trunk \
              --branches=branches \
              --tags=tags \
              projeto-qa-git

# 2. Verificar branches
cd projeto-qa-git
git branch -a

# 3. Converter branches SVN em branches Git
for branch in $(git branch -r | grep "origin/"); do
  git branch ${branch#origin/} $branch
done

# 4. Adicionar remote Git
git remote add github https://github.com/usuario/projeto-qa.git

# 5. Push para novo repositório
git push github --all
git push github --tags
```

---

## 📋 Comandos SVN Essenciais - Cheatsheet

### Operações Diárias
```bash
svn status                    # Ver arquivos modificados
svn add <arquivo>             # Adicionar arquivo novo
svn delete <arquivo>          # Remover arquivo
svn commit -m "mensagem"      # Enviar mudanças
svn update                    # Atualizar working copy
svn log                       # Ver histórico
svn diff                      # Ver diferenças
svn revert <arquivo>          # Desfazer mudanças locais
```

### Operações com Branches
```bash
svn copy <origem> <destino> -m "msg"  # Criar branch/tag
svn switch <url>                       # Mudar de branch
svn merge <url>                        # Merge de branch
svn info                               # Info do working copy
```

### Resolução de Conflitos
```bash
svn resolve --accept <opção> <arquivo>
# Opções: mine-full, theirs-full, working, base
```

---

## 🎯 Aplicação em Projetos de QA

### Estrutura SVN Típica para Testes
```
/qa-testes-erp/
├── trunk/                    # Versão principal
│   ├── config/
│   ├── tests/
│   └── reports/
├── branches/                 # Features em desenvolvimento
│   ├── sprint-23-financeiro/
│   └── hotfix-bug-estoque/
└── tags/                     # Releases
    ├── v1.0-producao/
    └── v1.1-producao/
```

### Boas Práticas SVN em QA
1. ✅ **Sempre dar `svn update` antes de trabalhar**
2. ✅ **Commits pequenos e frequentes**
3. ✅ **Mensagens descritivas:** "Adiciona teste de validação de ICMS ST"
4. ✅ **Usar branches para features grandes**
5. ✅ **Testar antes de commit** (rodar suite de testes)
6. ✅ **Não commitar arquivos gerados** (reports/, screenshots/)

---

## 🔄 Equivalência de Workflows

### Git Flow
```
main (produção) → develop (dev) → feature branches
```

### SVN Flow
```
trunk (produção) → branches/desenvolvimento → branches/feature-X
```

**Diferença:** Git permite trabalho offline completo, SVN precisa conexão para maioria das operações.

---

## 📊 Quando Usar Cada Um?

| Cenário | Recomendação |
|---------|--------------|
| Projeto novo | ✅ Git |
| ERP legado (20+ anos) | ⚠️ SVN (provavelmente já usa) |
| Trabalho remoto/offline | ✅ Git |
| Arquivos binários grandes | ⚠️ SVN (lock de arquivos) |
| Open source | ✅ Git |
| Corporativo com auditoria rigorosa | ⚠️ SVN ou Git com controles |

---

## 🎓 Certificações e Aprendizado

### Recursos SVN
- 📚 [SVN Red Book](http://svnbook.red-bean.com/) - Documentação oficial
- 🎥 Experiência prática em projetos corporativos

### Recursos Git
- 📚 Git Pro Book
- 🎥 Cursos: Git & GitHub, Git Flow

---

## ✅ Resumo de Competências

| Ferramenta | Nível | Uso |
|------------|-------|-----|
| **Git** | ⭐⭐⭐⭐⭐ | Diário |
| **SVN** | ⭐⭐⭐⭐ | Conforme necessidade |
| **GitHub/GitLab** | ⭐⭐⭐⭐⭐ | Diário |
| **Bitbucket** | ⭐⭐⭐ | Projetos específicos |

**Preparado para trabalhar em qualquer ambiente de versionamento!**