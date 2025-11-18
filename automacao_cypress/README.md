# 🧪 Automação de Testes E2E com Cypress - MVP Sigga

Automação de testes E2E usando Cypress para o MVP de automação de testes.

**Aplicação testada:** Django (`../app_django/`)

## 📋 Requisitos

- Node.js 18+
- npm ou yarn

## 🚀 Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Abrir Cypress (opcional - para desenvolvimento):**
```bash
npm run test:open
```

## ⚠️ IMPORTANTE: Aplicação Django Necessária

**Antes de executar os testes, você precisa ter a aplicação Django rodando!**

### Como iniciar a aplicação Django:

1. **Instalar dependências Python:**
```bash
cd ../app_django
pip install -r requirements.txt
```

2. **Executar migrações:**
```bash
python manage.py migrate
```

3. **Iniciar servidor na porta 3000:**
```bash
python manage.py runserver 3000
```

## 🧪 Executar Testes

### Executar Todos os Testes (Headless)
```bash
npm test
```

### Executar Testes com Navegador Visível
```bash
npm run test:headed
```

### Executar Testes em Chrome
```bash
npm run test:chrome
```

### Abrir Interface do Cypress (Modo Desenvolvimento)
```bash
npm run test:open
```

## 📁 Estrutura do Projeto

```
automacao_cypress/
├── cypress/
│   ├── e2e/
│   │   └── fluxo-completo.cy.ts    # Testes E2E principais
│   ├── fixtures/
│   │   └── dados-teste.json        # Dados de teste
│   └── support/
│       ├── pages/                   # Page Objects
│       │   ├── LoginPage.ts
│       │   ├── DashboardPage.ts
│       │   ├── TarefasPage.ts
│       │   └── index.ts
│       ├── commands.ts              # Custom Commands
│       └── e2e.ts                   # Configuração de suporte
├── cypress.config.ts                # Configuração do Cypress
├── tsconfig.json                    # Configuração TypeScript
├── package.json
└── README.md
```

## 🎯 Cenários de Teste

### 1. Fluxo Completo: Login + CRUD Completo + Logout
- Login no sistema
- Validação do dashboard
- Navegação para página de tarefas
- **Criar (Create):** Criação de nova tarefa
- Validação da tarefa criada
- **Ler (Read):** Validação da tarefa na lista
- **Atualizar (Update):** Edição da tarefa criada
- Validação da tarefa atualizada
- **Deletar (Delete):** Deleção de todas as tarefas existentes
- Validação de que a lista está vazia
- Logout

### 2. Validação de Login com Credenciais Inválidas
- Tentativa de login com credenciais inválidas
- Verificação de mensagem de erro

## 🔧 Custom Commands

### `cy.login(email, senha)`
Realiza login no sistema e aguarda redirecionamento para dashboard.

```typescript
cy.login('usuario@teste.com', 'senha123');
```

### `cy.logout()`
Realiza logout do sistema.

```typescript
cy.logout();
```

## 📄 Page Objects

### `TarefasPage`
Page Object que encapsula todas as interações com a página de tarefas.

#### Métodos Principais:

**Criar Tarefa:**
```typescript
tarefasPage.criarTarefa(titulo, descricao, prioridade);
```

**Atualizar Tarefa:**
```typescript
tarefasPage.atualizarTarefa(tituloAtual, novoTitulo, novaDescricao, novaPrioridade);
```

**Deletar Todas as Tarefas:**
```typescript
tarefasPage.deletarTodasTarefas();
```
Este método encontra todas as tarefas na lista e as deleta sequencialmente, aguardando a atualização da lista após cada deleção.

**Validar Lista Vazia:**
```typescript
tarefasPage.validarListaVazia();
```

## 📊 Dados de Teste

Os dados de teste estão em `cypress/fixtures/dados-teste.json`:

- **Credenciais válidas:** `usuario@teste.com` / `senha123`
- **Credenciais inválidas:** `usuario@invalido.com` / `senhaErrada`
- **Dados de tarefa:** Título, descrição e prioridade

## 🏗️ Boas Práticas Implementadas

### 1. Page Object Model (POM)
Encapsulamento de seletores e ações em classes dedicadas (`LoginPage`, `DashboardPage`, `TarefasPage`), facilitando manutenção e reutilização.

### 2. Custom Commands
Ações reutilizáveis encapsuladas em comandos customizados (`cy.login()`, `cy.logout()`).

### 3. Data Test IDs
Uso de atributos `data-testid` para seletores estáveis, independentes de mudanças de CSS.

### 4. Fixtures
Dados de teste centralizados em arquivos JSON, facilitando manutenção e variação de cenários.

### 5. Interceptação de Requisições HTTP
Uso de `cy.intercept()` para validar requisições de API (POST, PUT, DELETE, GET), garantindo que as operações CRUD estão funcionando corretamente.

### 6. CRUD Completo
O teste cobre todas as operações CRUD:
- **Create:** Criação de novas tarefas
- **Read:** Leitura e validação de tarefas na lista
- **Update:** Atualização de tarefas existentes
- **Delete:** Deleção de todas as tarefas (método `deletarTodasTarefas()`)

## 🔍 Debug

### Executar Teste Específico
```bash
npx cypress run --spec "cypress/e2e/fluxo-completo.cy.ts"
```

### Modo Interativo
```bash
npm run test:open
```

## 📝 Notas

- Cypress aguarda automaticamente elementos aparecerem (auto-wait)
- Screenshots e vídeos são gerados automaticamente em caso de falha
- Timeout padrão: 10 segundos (configurável)

---

**Autor:** Isabella Vieira Barbosa  
**Data:** 17/11/2025

