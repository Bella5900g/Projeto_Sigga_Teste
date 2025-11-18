# Desafio Técnico – QA Lead | Sigga
## Resposta Completa - Isabella Vieira Barbosa

![CI/CD](https://github.com/Bella5900g/Projeto_Sigga_Teste/workflows/%F0%9F%A7%AA%20CI/CD%20-%20Testes%20Automatizados/badge.svg)

---

## 📋 Estrutura do Projeto

Este repositório contém a resposta completa ao desafio técnico para a posição de QA Lead na Sigga, organizada em duas partes principais:

### 📄 Parte 1: Plano Estratégico de Qualidade
**Arquivo:** `01_Plano_Estrategico_Qualidade.md`

Documento estratégico de 2-3 páginas abordando:
- ✅ Arquitetura e Estratégia de Testes (Pirâmide de Testes, Frameworks, CI/CD)
- ✅ Cultura e Liderança (Shift-Left, Gestão de Bugs, Roadmap)
- ✅ KPIs e Métricas (Indicadores de Sucesso, Matriz de Priorização)

### 🛠️ Parte 2: MVP Técnico de Automação
**Diretório:** `automacao_cypress/`

MVP funcional de automação E2E contendo:
- ✅ Justificativa Técnica (`02_Justificativa_Tecnica.md`)
- ✅ Projeto Cypress completo com testes E2E
- ✅ Custom Commands para ações reutilizáveis
- ✅ README detalhado com instruções

---

## 🚀 Como Navegar

### Para ler o Plano Estratégico:
1. Abra o arquivo `01_Plano_Estrategico_Qualidade.md`
2. Este documento contém toda a estratégia proposta para resolver os desafios da Sigga

### Para executar o MVP de Automação:
1. **Inicie a aplicação Django:**
   ```bash
   cd app_django
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver 3000
   ```

2. **Execute os testes Cypress:**
   ```bash
   cd automacao_cypress
   npm install
   npm test
   ```

   **⚠️ IMPORTANTE:** A aplicação Django precisa estar rodando na porta 3000 antes de executar os testes!

### Para entender as decisões técnicas:
1. Leia o arquivo `02_Justificativa_Tecnica.md`
2. Entenda por que Cypress foi escolhido e quais boas práticas foram aplicadas

---

## 📁 Estrutura de Arquivos

```
Projeto_Sigga_Teste/
├── README.md                              # Este arquivo
├── 01_Plano_Estrategico_Qualidade.md      # Parte 1: Plano Estratégico
├── 02_Justificativa_Tecnica.md            # Justificativa Técnica
├── .github/
│   └── workflows/
│       ├── ci.yml                         # Pipeline CI/CD
│       └── README.md                      # Documentação CI/CD
├── app_django/                            # Aplicação Django
│   ├── sigga_app/                         # Configurações do projeto
│   ├── tarefas/                           # App de tarefas
│   │   ├── models.py                      # Modelo de Tarefa
│   │   ├── views.py                       # Views e APIs
│   │   ├── urls.py                        # URLs
│   │   └── templates/                     # Templates HTML
│   ├── manage.py
│   ├── requirements.txt
│   └── README.md                          # Instruções Django
└── automacao_cypress/                     # Parte 2: MVP Técnico
    ├── README.md                          # Instruções do MVP
    ├── package.json                       # Dependências
    ├── cypress.config.ts                  # Configuração Cypress
    ├── tsconfig.json                      # Configuração TypeScript
    ├── cypress/
    │   ├── e2e/
    │   │   └── fluxo-completo.cy.ts       # Testes E2E
    │   ├── fixtures/
    │   │   └── dados-teste.json           # Dados de teste
    │   └── support/
    │       ├── pages/                     # Page Objects
    │       │   ├── LoginPage.ts
    │       │   ├── DashboardPage.ts
    │       │   ├── TarefasPage.ts
    │       │   └── index.ts
    │       ├── commands.ts                # Custom Commands
    │       └── e2e.ts                     # Configuração de suporte
    └── .gitignore
```

---

## 🎯 Objetivos do Desafio

Este projeto demonstra como resolver os desafios específicos da Sigga:

1. **Baixa cobertura e evolução de testes automatizados**
   - ✅ Estratégia clara de pirâmide de testes
   - ✅ MVP funcional demonstrando automação
   - ✅ Roadmap de expansão

2. **Ciclos longos de regressão manual**
   - ✅ Automação de fluxos críticos
   - ✅ Integração CI/CD proposta
   - ✅ Redução de 70% no tempo de regressão (meta)

3. **Falta de padronização de cenários e métricas**
   - ✅ BDD com Gherkin/Cucumber proposto
   - ✅ Page Object Model implementado
   - ✅ KPIs e métricas definidos

---

## 💡 Destaques da Solução

### Estratégia
- **Pirâmide de Testes balanceada:** 60% unitários, 30% integração, 10% E2E
- **Shift-Left Quality:** Engajamento de Devs e POs desde o início
- **Roadmap trimestral:** Evolução incremental e sustentável

### Técnica
- **Cypress:** Framework moderno, confiável e fácil de usar
- **Custom Commands:** Código organizado e reutilizável
- **Data Test IDs:** Seletores estáveis e robustos
- **TypeScript:** Type safety e melhor DX
- **Auto-wait:** Sincronização automática com a aplicação

### Cultura
- **"Quality is everyone's responsibility"**
- **Processo de RCA focado em aprendizado**
- **Comunicação clara e dashboards de qualidade**

---

## 📊 Métricas Propostas

- **Cobertura de Testes:** 80%+ em código crítico
- **Bugs Escapados:** < 5% (95% capturados antes de produção)
- **Tempo de Regressão:** < 30 minutos (redução de 70%)
- **MTTR:** < 2 dias para bugs críticos
- **Taxa de Sucesso de Testes:** > 95% (baixa flakiness)

---

## 🔄 CI/CD Pipeline

Este projeto inclui um pipeline de CI/CD configurado com GitHub Actions que:

- ✅ **Executa automaticamente** em cada push e Pull Request
- ✅ **Configura o ambiente** (Python + Node.js)
- ✅ **Inicia o servidor Django** automaticamente
- ✅ **Executa todos os testes E2E** com Cypress
- ✅ **Gera artefatos** (vídeos e screenshots) em caso de falha
- ✅ **Relatórios visuais** no GitHub Actions

### 📋 Como funciona:

1. **Trigger:** Push para `main`/`develop` ou Pull Request
2. **Setup:** Instala Python 3.11 e Node.js 18
3. **Django:** Instala dependências, executa migrações e inicia servidor
4. **Cypress:** Instala dependências e executa testes E2E
5. **Artefatos:** Salva vídeos/screenshots se houver falhas

### 📊 Ver Status:

- Clique no badge no topo deste README
- Ou vá em **Actions** no GitHub para ver execuções detalhadas

**Arquivo de configuração:** `.github/workflows/ci.yml`

---

## 🎓 Próximos Passos Sugeridos

1. **Revisão do Plano Estratégico** com stakeholders
2. **Validação da Stack Tecnológica** com time de engenharia
3. **Início do Q1** com treinamento e configuração
4. **Execução do Roadmap** com revisões mensais

---

## 👤 Sobre a Autora

**Isabella Vieira Barbosa**  
QA Lead | Engenheira de Qualidade Sênior

- ✅ Mais de 10 anos de experiência em QA
- ✅ Certificações: ISTQB® CTFL | ASTFC™ (AICS)
- ✅ Especialista em TDD/BDD, CI/CD e Automação
- ✅ Experiência em liderança de times multidisciplinares

---

## 📞 Contato

Para dúvidas ou discussão sobre esta proposta, estou à disposição.

**LinkedIn:** [https://www.linkedin.com/in/isabellavieiraqa/](https://www.linkedin.com/in/isabellavieiraqa/)

---

**Data:** 17/11/2025  
**Versão:** 1.0

