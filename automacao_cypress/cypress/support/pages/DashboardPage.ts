/**
 * Page Object Model: Página de Dashboard
 * 
 * Encapsula todas as interações e seletores relacionados ao dashboard.
 */
export class DashboardPage {
  // Seletores usando data-testid para estabilidade
  private readonly tituloDashboard = '[data-testid="titulo-dashboard"]';
  private readonly mensagemBemVindo = '[data-testid="mensagem-bem-vindo"]';
  private readonly menuTarefas = '[data-testid="menu-tarefas"]';
  private readonly botaoLogout = '[data-testid="botao-logout"]';

  /**
   * Valida que o dashboard está carregado corretamente
   */
  validarCarregamento(): void {
    cy.url().should('include', '/dashboard');
    cy.get(this.tituloDashboard).should('be.visible');
    cy.get(this.mensagemBemVindo).should('be.visible');
  }

  /**
   * Valida a mensagem de boas-vindas
   * @param textoEsperado - Texto esperado na mensagem
   */
  validarMensagemBemVindo(textoEsperado: string = 'Bem-vindo'): void {
    cy.get(this.mensagemBemVindo).should('contain', textoEsperado);
  }

  /**
   * Navega para a página de tarefas
   */
  navegarParaTarefas(): void {
    cy.get(this.menuTarefas).click();
    cy.url().should('include', '/tarefas');
  }

  /**
   * Realiza logout
   */
  fazerLogout(): void {
    cy.get(this.botaoLogout).click();
    cy.url().should('include', '/login');
  }
}

