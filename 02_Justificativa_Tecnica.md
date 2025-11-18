# Justificativa Técnica - MVP de Automação
## Framework e Práticas Adotadas

**Autor:** Isabella Vieira Barbosa  
**Data:** 17/11/2025

---

## 1. Escolha do Framework: Cypress

### Por que Cypress?

Após análise comparativa entre as principais ferramentas de automação E2E (Cypress, Playwright, Selenium), **Cypress** foi escolhido como framework principal para o MVP da Sigga pelas seguintes razões técnicas:

#### 1.1 Auto-Wait e Sincronização

- **Auto-Wait Inteligente:** Cypress aguarda automaticamente elementos estarem prontos (visíveis, estáveis, habilitados), reduzindo significativamente a necessidade de `sleep()` e diminuindo flakiness
- **Execução no Navegador:** Cypress roda dentro do navegador, permitindo acesso direto ao DOM e melhor sincronização com aplicações JavaScript modernas
- **Retry Automático:** Comandos são automaticamente repetidos até que as asserções passem, aumentando robustez

#### 1.2 Developer Experience (DX)

- **Interface Visual Excelente:** Time Travel Debugging permite ver exatamente o que aconteceu em cada etapa do teste
- **TypeScript Nativo:** Suporte de primeira classe para TypeScript, com autocomplete e type safety
- **Documentação Excelente:** Documentação clara, exemplos práticos, comunidade muito ativa
- **Curva de Aprendizado Suave:** API intuitiva e fácil de entender, ideal para times que estão começando com automação

#### 1.3 Confiabilidade e Estabilidade

- **Menos Flaky Tests:** Auto-wait e retry automático reduzem significativamente testes instáveis
- **Screenshots e Vídeos Automáticos:** Em caso de falha, Cypress captura automaticamente screenshots e grava vídeos para facilitar debug
- **Isolamento de Testes:** Cada teste roda em um contexto limpo, evitando interferências

#### 1.4 Custom Commands

- **Reutilização de Código:** Custom Commands permitem encapsular ações complexas em comandos reutilizáveis
- **Legibilidade:** Testes ficam mais limpos e expressivos usando comandos como `cy.login()` e `cy.logout()`
- **Manutenibilidade:** Lógica de interação centralizada em um único lugar

#### 1.5 Integração com CI/CD

- **Configuração Simples:** Integração direta com GitHub Actions, GitLab CI, Jenkins, etc.
- **Relatórios Ricos:** HTML reports nativos, integração com ferramentas de relatório
- **Docker Ready:** Imagens Docker oficiais disponíveis

#### 1.6 Comparação Rápida: Cypress vs Playwright

| Aspecto | Cypress | Playwright |
|---------|---------|-----------|
| **Auto-Wait** | ⭐⭐⭐⭐⭐ Excelente | ⭐⭐⭐⭐⭐ Excelente |
| **Debug** | ⭐⭐⭐⭐⭐ Excelente (Time Travel) | ⭐⭐⭐⭐ Bom (Trace Viewer) |
| **Curva de Aprendizado** | ⭐⭐⭐⭐⭐ Muito Fácil | ⭐⭐⭐⭐ Moderada |
| **Multi-navegador** | ⭐⭐⭐ Limitado (Chromium no free) | ⭐⭐⭐⭐⭐ Nativo |
| **Execução no Navegador** | ⭐⭐⭐⭐⭐ Sim | ⭐⭐ Não |
| **CI/CD** | ⭐⭐⭐⭐ Bom | ⭐⭐⭐⭐⭐ Excelente |
| **Flakiness** | ⭐⭐⭐⭐ Muito Estável | ⭐⭐⭐⭐⭐ Muito Estável |

**Decisão:** Cypress oferece melhor equilíbrio entre facilidade de uso, confiabilidade e excelente experiência de desenvolvimento, sendo ideal para times que precisam de uma solução robusta e fácil de manter.

---

## 2. Boas Práticas Implementadas

### 2.1 Page Object Model (POM)

**O que é:**
Padrão de design que encapsula seletores e ações de uma página em uma classe dedicada, promovendo separação de responsabilidades e reutilização de código.

**Por que adotar:**
- **Manutenibilidade:** Quando a UI muda, apenas o Page Object precisa ser atualizado, não todos os testes
- **Reutilização:** Ações comuns podem ser usadas em múltiplos testes
- **Legibilidade:** Testes ficam mais limpos e expressivos usando métodos como `loginPage.fazerLogin()`
- **Abstração:** Esconde complexidade de implementação dos testes
- **Escalabilidade:** Facilita crescimento do projeto de automação

**Estrutura Implementada:**
```typescript
// cypress/support/pages/LoginPage.ts
export class LoginPage {
  private readonly campoEmail = '[data-testid="campo-email"]';
  
  fazerLogin(email: string, senha: string): void {
    this.visitar();
    this.preencherEmail(email);
    this.preencherSenha(senha);
    this.clicarEntrar();
  }
}

// Uso no teste
const loginPage = new LoginPage();
loginPage.fazerLogin('usuario@teste.com', 'senha123');
```

**Page Objects Criados:**
- `LoginPage`: Encapsula ações e validações da página de login
  - Métodos: `fazerLogin()`, `validarMensagemErro()`, `validarQueEstaNaPagina()`
- `DashboardPage`: Encapsula ações e validações do dashboard
  - Métodos: `validarCarregamento()`, `navegarParaTarefas()`, `fazerLogout()`
- `TarefasPage`: Encapsula ações e validações da página de tarefas (CRUD completo)
  - Métodos: `criarTarefa()`, `atualizarTarefa()`, `deletarTodasTarefas()`, `validarTarefaNaLista()`, `validarListaVazia()`
  - Interceptações: `interceptarCriacaoTarefa()`, `interceptarAtualizacaoTarefa()`, `interceptarDelecaoTarefa()`

### 2.2 Custom Commands

**O que é:**
Comandos personalizados que encapsulam ações complexas e reutilizáveis, promovendo código limpo e manutenível.

**Por que adotar:**
- **Reutilização:** Ações comuns podem ser usadas em múltiplos testes
- **Manutenibilidade:** Quando a lógica muda, apenas o Custom Command precisa ser atualizado
- **Legibilidade:** Testes ficam mais limpos e expressivos usando comandos como `cy.login()` e `cy.logout()`
- **Abstração:** Esconde complexidade de implementação dos testes

**Exemplo de Estrutura:**
```typescript
// cypress/support/commands.ts
Cypress.Commands.add('login', (email: string, senha: string) => {
  cy.visit('/login');
  cy.get('[data-testid="campo-email"]').type(email);
  cy.get('[data-testid="campo-senha"]').type(senha);
  cy.get('[data-testid="botao-entrar"]').click();
  cy.url().should('include', '/dashboard');
});

// Uso no teste
cy.login('usuario@teste.com', 'senha123');
```

### 2.2 Data Test IDs

**O que é:**
Uso de atributos `data-testid` em elementos HTML para identificação estável em testes, independente de mudanças de CSS ou estrutura.

**Por que adotar:**
- **Estabilidade:** Seletores não quebram quando estilos mudam
- **Intenção Clara:** `data-testid="botao-login"` é mais claro que `.btn-primary`
- **Manutenibilidade:** Reduz necessidade de atualizar testes quando UI evolui
- **Performance:** Seletores por ID são mais rápidos que CSS complexos

**Exemplo:**
```html
<!-- HTML -->
<button data-testid="botao-criar-tarefa" class="btn btn-primary">
  Criar Tarefa
</button>
```

```typescript
// Teste
await pagina.clicarEm('botao-criar-tarefa');
```

### 2.3 Fixtures e Factories para Dados de Teste

**O que é:**
Centralização de dados de teste em arquivos reutilizáveis (fixtures) e funções que geram dados dinâmicos (factories).

**Por que adotar:**
- **Consistência:** Dados padronizados garantem testes previsíveis
- **Reutilização:** Evita duplicação de código de setup
- **Flexibilidade:** Factories permitem variações de dados para diferentes cenários
- **Manutenção:** Mudanças em estrutura de dados refletem em um único lugar

**Exemplo:**
```typescript
// fixtures/usuarios.ts
export const usuarioValido = {
  email: 'usuario@teste.com',
  senha: 'senha123'
};

// factories/usuarios.ts
export function criarUsuario(overrides = {}) {
  return {
    email: `usuario-${Date.now()}@teste.com`,
    senha: 'senha123',
    ...overrides
  };
}
```

### 2.4 Configuração Centralizada

**O que é:**
Uso de arquivos de configuração centralizados para URLs, timeouts, credenciais, etc.

**Por que adotar:**
- **Flexibilidade:** Fácil alternância entre ambientes (dev, staging, prod)
- **Manutenção:** Mudanças de configuração em um único lugar
- **Segurança:** Credenciais podem ser gerenciadas via variáveis de ambiente

### 2.5 Testes Isolados e Independentes

**O que é:**
Cada teste deve poder executar independentemente, sem depender de estado de outros testes.

**Por que adotar:**
- **Paralelização:** Testes podem rodar em paralelo sem interferência
- **Debugging:** Falhas são mais fáceis de isolar e investigar
- **Manutenção:** Mudanças em um teste não afetam outros

**Implementação:**
- Setup/teardown adequado (limpeza de dados, reset de estado)
- Uso de `beforeEach` e `afterEach` para isolamento
- Evitar dependências entre testes

---

## 3. Estrutura do Projeto

```
automacao_cypress/
├── cypress/
│   ├── e2e/
│   │   └── fluxo-completo.cy.ts
│   ├── fixtures/
│   │   └── dados-teste.json
│   └── support/
│       ├── pages/               # Page Objects
│       │   ├── LoginPage.ts
│       │   ├── DashboardPage.ts
│       │   ├── TarefasPage.ts
│       │   └── index.ts
│       ├── commands.ts          # Custom Commands
│       └── e2e.ts                # Configuração de suporte
├── cypress.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Conclusão

A escolha do Cypress, combinada com as boas práticas de Page Object Model, Custom Commands, Data Test IDs e Fixtures, estabelece uma base sólida e escalável para a automação de testes na Sigga. Esta arquitetura permite:

- **Rápida adoção:** Curva de aprendizado suave, documentação excelente
- **Alta confiabilidade:** Auto-wait reduz flaky tests, execução estável
- **Fácil manutenção:** Código organizado, padrões claros, Custom Commands reutilizáveis
- **Escalabilidade:** Estrutura preparada para crescimento
- **Excelente DX:** Time Travel Debugging e interface visual facilitam desenvolvimento e debug

O MVP demonstra não apenas capacidade técnica, mas também visão estratégica de como a automação deve evoluir para suportar as necessidades de negócio da Sigga.

