# 🚀 GitHub Actions - CI/CD Pipeline

Este diretório contém os workflows de CI/CD configurados para o projeto.

## 📋 Workflows Disponíveis

### `ci.yml` - Pipeline de Testes Automatizados

Pipeline completo que executa os testes E2E do projeto.

#### O que este workflow faz:

1. **📥 Checkout do código** - Baixa o código do repositório
2. **🐍 Configuração Python** - Instala Python 3.11 e cache de dependências
3. **📦 Instalação Django** - Instala todas as dependências do projeto Django
4. **🗄️ Migrações** - Executa migrações do banco de dados
5. **🚀 Servidor Django** - Inicia o servidor em background na porta 3000
6. **⏳ Aguarda Servidor** - Verifica se o servidor está pronto antes de continuar
7. **📦 Configuração Node.js** - Instala Node.js 18 e cache de dependências
8. **📥 Instalação Cypress** - Instala todas as dependências do projeto de automação
9. **🧪 Execução de Testes** - Roda todos os testes E2E com Cypress
10. **📊 Upload de Artefatos** - Salva vídeos e screenshots em caso de falha

#### Quando é executado:

- ✅ Push para branches `main` ou `develop`
- ✅ Pull Requests para `main` ou `develop`
- ✅ Execução manual via GitHub Actions UI

#### Artefatos gerados:

- 📹 **Vídeos dos testes** (apenas em caso de falha)
- 📸 **Screenshots** (apenas em caso de falha)

#### Tempo de execução:

Aproximadamente **2-3 minutos** dependendo da velocidade do runner.

---

## 🔧 Como usar

### Execução Automática

O workflow é executado automaticamente quando você:
- Faz push para `main` ou `develop`
- Abre um Pull Request para essas branches

### Execução Manual

1. Vá para a aba **Actions** no GitHub
2. Selecione o workflow **🧪 CI/CD - Testes Automatizados**
3. Clique em **Run workflow**
4. Selecione a branch e clique em **Run workflow**

### Verificar Status

- ✅ **Verde**: Todos os testes passaram
- ❌ **Vermelho**: Algum teste falhou (veja os logs para detalhes)
- 🟡 **Amarelo**: Pipeline em execução

---

## 📊 Visualização dos Resultados

Após a execução, você pode ver:
- ✅ Status de cada etapa
- 📝 Logs detalhados de cada passo
- 📹 Vídeos dos testes (se falharem)
- 📸 Screenshots dos erros (se houverem)

---

## 🛠️ Customização

### Alterar versões

Edite o arquivo `.github/workflows/ci.yml`:

```yaml
python-version: '3.11'  # Altere a versão do Python
node-version: '18'       # Altere a versão do Node.js
```

### Adicionar mais testes

Adicione novos jobs ou steps no workflow conforme necessário.

---

## 📝 Notas

- O servidor Django roda em background durante os testes
- O banco de dados é criado automaticamente (SQLite em memória)
- Vídeos e screenshots são salvos apenas em caso de falha para economizar espaço

---

**Última atualização:** 17/11/2025

