/**
 * Page Object Model: Página de Login
 * 
 * Encapsula todas as interações e seletores relacionados à página de login.
 * Facilita manutenção e reutilização de código.
 */
export class LoginPage {
  // Seletores usando data-testid para estabilidade
  private readonly campoEmail = '[data-testid="campo-email"]';
  private readonly campoSenha = '[data-testid="campo-senha"]';
  private readonly botaoEntrar = '[data-testid="botao-entrar"]';
  private readonly mensagemErro = '[data-testid="mensagem-erro"]';

  /**
   * Visita a página de login
   */
  visitar(): void {
    cy.visit('/login');
  }

  /**
   * Preenche o campo de email
   * @param email - Email do usuário
   */
  preencherEmail(email: string): void {
    cy.get(this.campoEmail).type(email);
  }

  /**
   * Preenche o campo de senha
   * @param senha - Senha do usuário
   */
  preencherSenha(senha: string): void {
    cy.get(this.campoSenha).type(senha);
  }

  /**
   * Clica no botão de entrar
   */
  clicarEntrar(): void {
    cy.get(this.botaoEntrar).click();
  }

  /**
   * Realiza login completo
   * @param email - Email do usuário
   * @param senha - Senha do usuário
   */
  fazerLogin(email: string, senha: string): void {
    this.visitar();
    this.preencherEmail(email);
    this.preencherSenha(senha);
    this.clicarEntrar();
  }

  /**
   * Valida que a mensagem de erro está visível
   * @param mensagemEsperada - Mensagem de erro esperada
   */
  validarMensagemErro(mensagemEsperada: string): void {
    cy.get(this.mensagemErro).should('be.visible');
    cy.get(this.mensagemErro).should('contain', mensagemEsperada);
  }

  /**
   * Valida que está na página de login
   */
  validarQueEstaNaPagina(): void {
    cy.url().should('include', '/login');
    cy.get(this.campoEmail).should('be.visible');
  }
}

