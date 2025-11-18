/**
 * Teste E2E: Fluxo Completo de Login + CRUD de Tarefas + Logout
 * 
 * Este teste valida a jornada completa do usuário:
 * 1. Login no sistema
 * 2. Navegação para o dashboard
 * 3. Criação de uma nova tarefa
 * 4. Validação da tarefa criada
 * 5. Atualização da tarefa
 * 6. Validação da tarefa atualizada
 * 7. Deleção de todas as tarefas
 * 8. Validação de que a lista está vazia
 * 9. Logout
 * 
 * Boas práticas aplicadas:
 * - Page Object Model (POM) para encapsulamento de seletores e ações
 * - Custom Commands para ações reutilizáveis
 * - Data Test IDs para seletores estáveis
 * - Fixtures para dados de teste
 * - Testes isolados e independentes
 */

import { LoginPage, DashboardPage, TarefasPage } from '../support/pages';

describe('Fluxo Completo: Login + CRUD + Logout', () => {
  // Instâncias dos Page Objects
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let tarefasPage: TarefasPage;

  beforeEach(() => {
    // Carrega dados de teste
    cy.fixture('dados-teste').as('dados');
    
    // Inicializa Page Objects
    loginPage = new LoginPage();
    dashboardPage = new DashboardPage();
    tarefasPage = new TarefasPage();
  });

  it('deve realizar login, criar tarefa, validar, atualizar, deletar e fazer logout', function() {
    const { credenciaisValidas, dadosTarefa, dadosTarefaAtualizada } = this.dados;

    // ========== ETAPA 1: LOGIN ==========
    loginPage.fazerLogin(credenciaisValidas.email, credenciaisValidas.senha);

    // ========== ETAPA 2: VALIDAR DASHBOARD ==========
    dashboardPage.validarCarregamento();
    dashboardPage.validarMensagemBemVindo();

    // ========== ETAPA 3: NAVEGAR PARA TAREFAS ==========
    dashboardPage.navegarParaTarefas();
    tarefasPage.validarCarregamento();

    // ========== ETAPA 4: CRIAR TAREFA ==========
    // Intercepta requisição ANTES de fazer a ação
    tarefasPage.interceptarCriacaoTarefa();
    
    tarefasPage.criarTarefa(
      dadosTarefa.titulo,
      dadosTarefa.descricao,
      dadosTarefa.prioridade
    );
    
    // Aguarda a requisição e valida status
    cy.wait('@criarTarefa').its('response.statusCode').should('eq', 200);
    
    // Verificar mensagem de sucesso
    tarefasPage.validarMensagemSucesso('Tarefa criada com sucesso');

    // ========== ETAPA 5: VALIDAR TAREFA CRIADA ==========
    tarefasPage.validarTarefaNaLista(dadosTarefa.titulo);
    tarefasPage.validarConteudoTarefa(dadosTarefa.titulo, dadosTarefa.descricao);

    // ========== ETAPA 6: ATUALIZAR TAREFA ==========
    // Intercepta requisição ANTES de fazer a ação
    tarefasPage.interceptarAtualizacaoTarefa();
    
    tarefasPage.atualizarTarefa(
      dadosTarefa.titulo,
      dadosTarefaAtualizada.titulo,
      dadosTarefaAtualizada.descricao,
      dadosTarefaAtualizada.prioridade
    );
    
    // Aguarda a requisição e valida status
    cy.wait('@atualizarTarefa').its('response.statusCode').should('eq', 200);
    
    // Verificar mensagem de sucesso
    tarefasPage.validarMensagemSucesso('Tarefa atualizada com sucesso');

    // ========== ETAPA 7: VALIDAR TAREFA ATUALIZADA ==========
    tarefasPage.validarTarefaNaLista(dadosTarefaAtualizada.titulo);
    tarefasPage.validarConteudoTarefa(dadosTarefaAtualizada.titulo, dadosTarefaAtualizada.descricao);

    // ========== ETAPA 8: DELETAR TODAS AS TAREFAS ==========
    // Deleta todas as tarefas existentes na lista (incluindo a que foi criada e atualizada)
    tarefasPage.deletarTodasTarefas();

    // ========== ETAPA 9: VALIDAR LISTA VAZIA ==========
    // Valida que não há mais tarefas na lista
    tarefasPage.validarListaVazia();

    // ========== ETAPA 10: LOGOUT ==========
    cy.visit('/dashboard');
    dashboardPage.fazerLogout();
    
    // Verificar redirecionamento para página de login
    loginPage.validarQueEstaNaPagina();
  });

  it('deve validar login com credenciais inválidas', function() {
    const { credenciaisInvalidas } = this.dados;

    // Tenta fazer login com credenciais inválidas
    loginPage.fazerLogin(credenciaisInvalidas.email, credenciaisInvalidas.senha);
    
    // Verificar que mensagem de erro é exibida
    loginPage.validarMensagemErro('Credenciais inválidas');
  });
});

