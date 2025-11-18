# Plano Estratégico de Qualidade - Sigga
## Desafio Técnico – QA Lead
**Autor:** Isabella Vieira Barbosa  
**Data:** 17/11/2025

---

## 1. Arquitetura e Estratégia de Testes

### 1.1 Níveis de Teste: Pirâmide Adaptada para Sigga

A estratégia de testes será baseada na **Pirâmide de Testes de Cohn**, adaptada para a realidade da Sigga, com foco em reduzir ciclos longos de regressão manual e aumentar a confiança nas entregas.

#### Estrutura Proposta:

```
                    ┌─────────────────┐
                    │   Testes E2E    │  ← 10% (Fluxos Críticos)
                    │   (Cypress MVP) │
                    │  (Playwright*)  │  *Futuro
                    ├─────────────────┤
                    │  Testes API/    │  ← 30% (Integração)
                    │  Integração     │
                    │  (Vitest/Supertest)│
                    ├─────────────────┤
                    │  Testes Unitários│  ← 60% (Base Sólida)
                    │  (Vitest/Jest)  │
                    └─────────────────┘
```

#### Detalhamento por Camada:

**1. Testes Unitários (60% do esforço)**
- **Foco:** Lógica de negócio, funções puras, utilitários, validações
- **Responsabilidade:** Desenvolvedores (com suporte de QA)
- **Ferramenta:** Vitest (moderno, rápido, compatível com Vite)
- **Objetivo:** Detectar bugs na origem, reduzir tempo de feedback
- **Cobertura Alvo:** 80%+ em funções críticas de negócio

**2. Testes de Integração/API (30% do esforço)**
- **Foco:** Contratos entre serviços, integrações externas, fluxos de dados
- **Responsabilidade:** QA + Devs (pair testing)
- **Ferramenta:** Vitest + Supertest (para APIs Node.js) ou Playwright API Testing
- **Objetivo:** Validar integrações sem depender da UI
- **Cobertura Alvo:** 100% dos endpoints críticos

**3. Testes E2E (10% do esforço)**
- **Foco:** Fluxos críticos do usuário (Happy Path + Cenários de erro críticos)
- **Responsabilidade:** QA (com participação de POs na validação)
- **Ferramenta (MVP):** Cypress (escolhido para MVP pela excelente DX, auto-wait inteligente, Time Travel debugging e curva de aprendizado suave)
- **Ferramenta (Futuro):** Playwright (avaliado para migração futura devido à velocidade superior, suporte multi-navegador nativo e melhor performance em CI/CD)
- **Objetivo:** Validar jornadas completas do usuário
- **Cobertura Alvo:** 10-15 fluxos críticos mapeados com POs

#### Decisão e Trade-off: Por que essa estrutura?

**Justificativa:**
- **Redução de Ciclos Longos:** Testes unitários executam em segundos, permitindo feedback imediato durante o desenvolvimento. Isso elimina a necessidade de rodar regressão manual completa a cada mudança.
- **Custo-Benefício:** Testes E2E são caros (lentos, frágeis, difíceis de manter). Ao focar apenas em fluxos críticos, maximizamos o ROI.
- **Confiança Progressiva:** A base sólida de testes unitários e de integração garante que a maioria dos bugs seja capturada antes dos E2E, que funcionam como "rede de segurança" final.

**Trade-offs Aceitos:**
- **Menos E2E = Menos Cobertura Visual:** Aceitamos ter menos testes E2E em troca de velocidade e estabilidade. A cobertura visual será complementada por testes de acessibilidade automatizados e validação manual exploratória em releases.
- **Maior Dependência de Devs:** Para que funcione, precisamos engajar devs na escrita de testes unitários. Isso é um investimento inicial, mas paga dividendos a longo prazo.

### 1.2 Frameworks e Ferramentas

#### Stack Tecnológico Proposto:

| Camada | Ferramenta | Justificativa |
|--------|-----------|---------------|
| **Unitários** | Vitest | Moderno, rápido, compatível com Vite/React, TypeScript nativo, excelente DX |
| **Integração/API** | Vitest + Supertest | Mesma stack de unitários, reduz curva de aprendizado |
| **E2E (MVP)** | Cypress | Excelente DX, auto-wait inteligente, Time Travel debugging, curva de aprendizado suave, ideal para começar rápido |
| **E2E (Futuro)** | Playwright | Velocidade superior, suporte multi-navegador nativo, melhor para CI/CD em escala |
| **BDD** | Cucumber.js + Gherkin | Padronização de cenários em linguagem natural, facilita comunicação com POs |
| **CI/CD** | GitHub Actions | Integração nativa, fácil configuração, custo zero para projetos open-source |
| **Relatórios** | Allure Reports | Relatórios visuais e detalhados, integração com CI/CD |

#### Justificativa das Escolhas:

**Estratégia de Ferramentas E2E:**
- **Cypress (MVP - Fase Inicial):** Escolhido para o MVP pela excelente experiência de desenvolvimento (Time Travel debugging), auto-wait inteligente que reduz flakiness, curva de aprendizado suave ideal para times que estão começando com automação, e documentação excelente. Permite começar rápido e entregar valor imediato.
- **Playwright (Futuro - Escala):** Avaliado para migração futura quando a automação crescer, devido à execução mais rápida, suporte nativo multi-navegador, melhor performance em CI/CD e arquitetura mais moderna. A migração será considerada quando a velocidade e multi-navegador se tornarem críticos.
- **Decisão:** Começar com Cypress no MVP permite validação rápida da estratégia e entrega de valor. A migração para Playwright pode ser avaliada no Q3/Q4 quando houver necessidade de escala e performance.

**Vitest vs Jest:**
- **Vitest:** Mais rápido, melhor integração com Vite, TypeScript nativo, API moderna
- **Jest:** Mais maduro, mas mais lento e com configuração mais complexa

#### Padronização de Cenários:

**1. BDD com Gherkin/Cucumber:**
- Cenários escritos em linguagem natural (Gherkin)
- Facilita comunicação entre QA, Devs e POs
- Exemplo:
```gherkin
Funcionalidade: Login
  Como um usuário
  Eu quero fazer login no sistema
  Para acessar minhas funcionalidades

  Cenário: Login com credenciais válidas
    Dado que estou na página de login
    Quando preencho email "usuario@sigga.com" e senha "senha123"
    E clico em "Entrar"
    Então devo ser redirecionado para o dashboard
    E devo ver a mensagem "Bem-vindo, Usuário"
```

**2. Page Object Model (POM):**
- Separação de responsabilidades: lógica de teste vs. seletores/elementos
- Reutilização de código
- Manutenção facilitada quando UI muda

**3. Data Test IDs:**
- Uso de `data-testid` em vez de seletores CSS frágeis
- Reduz quebras quando estilos mudam
- Facilita manutenção

**4. Fixtures e Factories:**
- Dados de teste centralizados e reutilizáveis
- Fácil criação de cenários de teste variados

### 1.3 Pipeline CI/CD (MVP Leve)

#### Arquitetura do Pipeline:

```yaml
# .github/workflows/qa-pipeline.yml (exemplo conceitual)

Fluxo:
1. Push para branch
   ↓
2. Lint + Build
   ↓
3. Testes Unitários (paralelo, rápido)
   ↓
4. Testes de Integração (paralelo)
   ↓
5. Deploy para Staging (se testes passaram)
   ↓
6. Testes E2E contra Staging (on-demand ou agendado)
   ↓
7. Deploy para Produção (aprovado manualmente)
```

#### Integração de Testes:

**Testes Unitários e Integração:**
- **Trigger:** A cada commit em qualquer branch
- **Execução:** Paralela, em containers isolados
- **Tempo Alvo:** < 5 minutos
- **Bloqueio:** Falha bloqueia merge (se configurado)

**Testes E2E:**
- **Trigger:** 
  - On-demand (manual via GitHub Actions)
  - Agendado (diariamente contra staging)
  - Automático antes de release para produção
- **Execução:** Paralela em múltiplos navegadores (Chrome, Firefox, Safari)
- **Tempo Alvo:** < 15 minutos para suite completa
- **Bloqueio:** Falha bloqueia deploy para produção (não bloqueia merge)

#### Risco: Flaky Tests (Testes Instáveis)

**Mitigações Propostas:**

1. **Retry Strategy:**
   - Implementar retry automático (máx. 2 tentativas) apenas para falhas de rede/timeout
   - Não retry para falhas de asserção (bugs reais)

2. **Seletores Robustos:**
   - Priorizar `data-testid` sobre seletores CSS/XPath
   - Usar `waitFor` com condições explícitas

3. **Isolamento de Testes:**
   - Cada teste deve ser independente
   - Setup/teardown adequado (limpeza de dados, reset de estado)

4. **Monitoramento:**
   - Dashboard de flakiness (taxa de retry, testes que mais falham)
   - Alertas quando taxa de flakiness > 5%

5. **Code Review:**
   - Revisar testes automatizados com mesmo rigor que código de produção
   - Checklist: seletores robustos? isolamento? dados de teste?

---

## 2. Cultura e Litorança

### 2.1 Engajamento (Shift-Left Quality)

**Filosofia:** "Quality is everyone's responsibility" - A qualidade não é responsabilidade exclusiva do QA, mas de todo o time.

#### Estratégia de Engajamento:

**1. "3 Amigos" para Refinamento de Cenários:**
- **Participantes:** Dev, QA, PO
- **Frequência:** Durante Sprint Planning e Refinement
- **Objetivo:** Alinhar critérios de aceite, identificar edge cases, definir estratégia de teste
- **Resultado:** Cenários de teste definidos antes do desenvolvimento começar

**2. Pair Testing (Dev + QA):**
- **Quando:** Durante desenvolvimento de features complexas
- **Formato:** QA e Dev testam juntos, QA ensina técnicas de teste exploratório
- **Benefício:** Bugs detectados mais cedo, conhecimento compartilhado

**3. Test-Driven Development (TDD) para Lógica Crítica:**
- **Aplicação:** Funções de negócio críticas, cálculos, validações
- **Processo:** 
  1. QA/PO define critérios de aceite
  2. Dev escreve teste que falha
  3. Dev implementa código que passa
  4. Refatora
- **Resultado:** Código mais testável, bugs reduzidos

**4. Behavior-Driven Development (BDD) para Features:**
- **Processo:**
  1. PO descreve comportamento em Gherkin
  2. QA traduz para testes automatizados
  3. Dev implementa feature para passar nos testes
- **Resultado:** Alinhamento entre negócio e código

**5. Code Review com Foco em Testabilidade:**
- **Checklist de Review:**
  - Código testável? (baixo acoplamento, alta coesão)
  - Testes unitários incluídos?
  - Edge cases cobertos?
  - Documentação atualizada?

**6. "Bug Bash" Mensal:**
- **Formato:** Sessão de 1-2 horas onde todo o time testa a aplicação
- **Objetivo:** Encontrar bugs, melhorar conhecimento do produto, fortalecer cultura de qualidade
- **Gamificação:** Prêmios simbólicos para mais bugs encontrados

### 2.2 Gestão de Bugs Escapados e Comunicação

#### Processo de Análise de Bugs em Produção:

**1. Classificação Imediata:**
- **Severidade:** Crítica, Alta, Média, Baixa
- **Impacto:** Quantos usuários afetados? Qual funcionalidade?
- **Urgência:** Precisa hotfix? Pode esperar próximo release?

**2. Post-Mortem / Análise de Causa Raiz (RCA):**

**Template de RCA:**
```
Bug: [Descrição]
Data: [Data]
Severidade: [Nível]

1. O que aconteceu?
   - Descrição do bug
   - Impacto no usuário/negócio

2. Por que aconteceu?
   - Causa raiz (5 Whys)
   - Onde falhou o processo? (Teste, Code Review, etc.)

3. O que aprendemos?
   - Lições aprendidas
   - O que poderia ter sido feito diferente?

4. Ações Preventivas:
   - [ ] Adicionar teste automatizado
   - [ ] Atualizar checklist de code review
   - [ ] Melhorar documentação
   - [ ] Treinamento adicional

5. Responsável e Prazo:
   - [Nome] - [Data]
```

**Princípios:**
- **Foco em aprendizado, não em culpa:** RCA é para melhorar processos, não para apontar culpados
- **Ações preventivas obrigatórias:** Cada bug deve gerar pelo menos uma ação preventiva
- **Compartilhamento:** RCAs compartilhados em reunião mensal de qualidade

**3. Comunicação e Dashboards:**

**Dashboard de Qualidade (Exemplo com Grafana/Metabase):**
- **Métricas em Tempo Real:**
  - Taxa de bugs escapados (últimos 30 dias)
  - Cobertura de testes (tendência)
  - Tempo médio de ciclo de regressão
  - Taxa de sucesso de testes automatizados
  - MTTR (Mean Time to Resolution)

**Canais de Comunicação:**
- **Slack/Teams:**
  - Canal #qualidade: Notificações de bugs críticos, resultados de testes
  - Bot de CI/CD: Notificações automáticas de falhas de pipeline
- **Reuniões:**
  - **Daily:** QA compartilha status de testes, blockers
  - **Sprint Review:** Demo de automações, métricas de qualidade
  - **Retrospectiva:** Discussão de melhorias no processo de QA

### 2.3 Roadmap de Qualidade (Próximo Ano)

#### Q1: Fundação e Treinamento
**Objetivos:**
- Definir e documentar estratégia de testes
- Escolher e configurar ferramentas
- Treinamento da equipe (Devs e QAs) em TDD/BDD
- Implementar pipeline CI/CD básico
- Automação dos 3 fluxos mais críticos

**Entregas:**
- Documentação de estratégia
- Pipeline CI/CD funcional
- 3 testes E2E automatizados
- Cobertura de testes unitários: 40%+

#### Q2: Expansão e Padronização
**Objetivos:**
- Automação de 10 fluxos críticos (total)
- Implementar BDD com Cucumber
- Padronizar Page Object Model
- Reduzir tempo de regressão manual em 30%

**Entregas:**
- 10 testes E2E automatizados
- Framework BDD configurado
- Documentação de padrões de automação
- Cobertura de testes unitários: 60%+

#### Q3: Integração e Otimização
**Objetivos:**
- Integração completa de testes no CI/CD
- Reduzir tempo de regressão manual em 50%
- Implementar testes de performance (Lighthouse CI)
- Dashboard de qualidade operacional

**Entregas:**
- Pipeline CI/CD completo
- Testes de performance automatizados
- Dashboard de métricas
- Cobertura de testes unitários: 75%+

#### Q4: Maturidade e Escalabilidade
**Objetivos:**
- Automação de 20+ fluxos críticos
- Reduzir tempo de regressão manual em 70%
- Implementar testes de acessibilidade (axe-core)
- Cultura de qualidade consolidada

**Entregas:**
- 20+ testes E2E automatizados
- Testes de acessibilidade integrados
- Cobertura de testes unitários: 80%+
- Processo de qualidade maduro e documentado

---

## 3. KPIs e Métricas

### 3.1 Indicadores de Sucesso

#### KPIs Essenciais (Top 5):

**1. Taxa de Cobertura de Testes (Code Coverage)**
- **Métrica:** % de código coberto por testes automatizados
- **Meta:** 80%+ em código crítico, 60%+ geral
- **Por que é importante:** Garante que mudanças no código são validadas automaticamente, reduzindo risco de regressão
- **Como medir:** Ferramentas como Vitest Coverage, Istanbul

**2. Taxa de Bugs Escapados (Escaped Defect Rate)**
- **Métrica:** Número de bugs encontrados em produção / Total de bugs encontrados
- **Meta:** < 5% (95% dos bugs capturados antes de produção)
- **Por que é importante:** Mede a efetividade da estratégia de testes. Bugs em produção têm custo alto (suporte, retrabalho, impacto no usuário)
- **Como medir:** Rastreamento em ferramenta de gestão (Jira, Linear)

**3. Tempo de Ciclo de Regressão**
- **Métrica:** Tempo médio para executar suite completa de testes de regressão
- **Meta:** < 30 minutos (automatizado), redução de 70% vs. manual
- **Por que é importante:** Ciclos longos atrasam releases e aumentam custo. Automação reduz tempo e permite feedback rápido
- **Como medir:** Tempo de execução do pipeline CI/CD

**4. MTTR (Mean Time to Resolution)**
- **Métrica:** Tempo médio desde a detecção de um bug até sua resolução
- **Meta:** < 2 dias para bugs críticos, < 5 dias para bugs altos
- **Por que é importante:** Reduz impacto no usuário e custo de suporte. Time de resposta rápido aumenta confiança
- **Como medir:** Rastreamento em ferramenta de gestão

**5. Taxa de Sucesso de Testes Automatizados (Pass Rate)**
- **Métrica:** % de testes que passam na primeira execução (sem retry)
- **Meta:** > 95% (baixa flakiness)
- **Por que é importante:** Testes instáveis (flaky) geram ruído, perdem confiança e aumentam tempo de investigação
- **Como medir:** Relatórios do CI/CD, dashboard de flakiness

#### Métricas Secundárias (Monitoramento):

- **Número de Testes Automatizados:** Crescimento ao longo do tempo
- **Tempo de Feedback (Time to Feedback):** Tempo desde commit até resultado de testes
- **Taxa de Automação:** % de cenários críticos automatizados
- **Custo por Bug:** Custo médio de detectar e corrigir um bug (em produção vs. desenvolvimento)

### 3.2 Matriz de Priorização de Bugs

#### Matriz 4x4: Impacto vs. Frequência

```
                    ┌─────────────┬─────────────┬─────────────┬─────────────┐
                    │  Frequência │    Alta     │    Média    │    Baixa    │
├───────────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Impacto Crítico   │   🔴 P0    │   🔴 P0    │   🟠 P1    │   🟠 P1    │
│ (Sistema inacessível,│ Resolver   │ Resolver   │ Resolver   │ Resolver   │
│  perda de dados)   │ Imediatamente│ Imediatamente│ em 24h     │ em 48h     │
├───────────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Impacto Alto       │   🟠 P1    │   🟠 P1    │   🟡 P2    │   🟡 P2    │
│ (Funcionalidade    │ Resolver    │ Resolver   │ Resolver   │ Planejar   │
│  principal quebrada│ em 24h      │ em 48h     │ em 1 semana│ no próximo │
│  para muitos)      │             │             │             │ sprint     │
├───────────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Impacto Médio      │   🟡 P2    │   🟡 P2    │   🟢 P3    │   🟢 P3    │
│ (Funcionalidade    │ Resolver    │ Planejar   │ Planejar   │ Backlog    │
│  secundária quebrada│ em 1 semana│ no próximo │ no próximo │ (baixa     │
│  ou impacto limitado)│             │ sprint     │ sprint     │ prioridade)│
├───────────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Impacto Baixo      │   🟢 P3    │   🟢 P3    │   🟢 P3    │   ⚪ P4    │
│ (Cosmético,        │ Planejar    │ Backlog    │ Backlog    │ Backlog    │
│  melhoria)         │ no próximo  │ (baixa     │ (baixa     │ (muito     │
│                    │ sprint      │ prioridade)│ prioridade)│ baixa      │
│                    │             │             │             │ prioridade)│
└───────────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
```

#### Definição de Níveis:

**Impacto:**
- **Crítico:** Sistema inacessível, perda de dados, segurança comprometida, bloqueio total de funcionalidade crítica
- **Alto:** Funcionalidade principal quebrada para muitos usuários, impacto significativo no negócio
- **Médio:** Funcionalidade secundária quebrada, impacto limitado, workaround disponível
- **Baixo:** Cosmético, melhoria, impacto mínimo no usuário

**Frequência:**
- **Alta:** Acontece sempre ou na maioria dos casos (> 50% das tentativas)
- **Média:** Acontece ocasionalmente (10-50% das tentativas)
- **Baixa:** Acontece raramente (< 10% das tentativas)

#### Ações por Prioridade:

- **P0 (Crítico):** Hotfix imediato, deploy de emergência, comunicação proativa
- **P1 (Alto):** Resolver no próximo release (24-48h), comunicação se necessário
- **P2 (Médio):** Planejar para próximo sprint, documentar workaround
- **P3 (Baixo):** Backlog, avaliar ROI antes de implementar
- **P4 (Muito Baixo):** Backlog de melhorias, pode nunca ser implementado

---

## Conclusão

Este plano estratégico estabelece uma base sólida para transformar a qualidade na Sigga, focando em:

1. **Automação Inteligente:** Pirâmide de testes bem balanceada, reduzindo ciclos longos
2. **Cultura Colaborativa:** Engajamento de Devs e POs, qualidade como responsabilidade de todos
3. **Métricas Acionáveis:** KPIs claros que guiam decisões e medem progresso

A implementação será incremental, começando com um MVP focado nos fluxos mais críticos e expandindo gradualmente, sempre com foco em valor de negócio e sustentabilidade técnica.

---

**Próximos Passos:**
1. Alinhamento com stakeholders (Engenharia, Produto, Liderança)
2. Validação de ferramentas e stack tecnológico
3. Início do Q1 com treinamento e configuração inicial
4. Execução do roadmap trimestral com revisões mensais

