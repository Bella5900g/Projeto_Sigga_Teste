/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Realiza login no sistema
       * @param email - Email do usuário
       * @param senha - Senha do usuário
       * @example cy.login('usuario@teste.com', 'senha123')
       */
      login(email: string, senha: string): Chainable<void>;
      
      /**
       * Realiza logout do sistema
       * @example cy.logout()
       */
      logout(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (email: string, senha: string) => {
  cy.visit('/login');
  
  // Preenche formulário
  cy.get('[data-testid="campo-email"]').type(email);
  cy.get('[data-testid="campo-senha"]').type(senha);
  
  // Clica no botão de entrar
  cy.get('[data-testid="botao-entrar"]').click();
  
  // Aguarda redirecionamento para dashboard
  cy.url().should('include', '/dashboard');
  
  // Aguarda elementos do dashboard estarem visíveis
  cy.get('[data-testid="titulo-dashboard"]').should('be.visible');
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="botao-logout"]').click();
  cy.url().should('include', '/login');
});

export {};

