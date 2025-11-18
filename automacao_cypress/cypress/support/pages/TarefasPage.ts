/**
 * Page Object Model: Página de Tarefas
 * 
 * Encapsula todas as interações e seletores relacionados à página de tarefas.
 */
export class TarefasPage {
  // Seletores usando data-testid para estabilidade
  private readonly listaTarefas = '[data-testid="lista-tarefas"]';
  private readonly botaoCriarTarefa = '[data-testid="botao-criar-tarefa"]';
  private readonly campoTituloTarefa = '[data-testid="campo-titulo-tarefa"]';
  private readonly campoDescricaoTarefa = '[data-testid="campo-descricao-tarefa"]';
  private readonly campoPrioridadeTarefa = '[data-testid="campo-prioridade-tarefa"]';
  private readonly botaoSalvarTarefa = '[data-testid="botao-salvar-tarefa"]';
  private readonly mensagemSucesso = '[data-testid="mensagem-sucesso"]';

  /**
   * Valida que a página de tarefas está carregada
   */
  validarCarregamento(): void {
    cy.url().should('include', '/tarefas');
    cy.get(this.listaTarefas).should('be.visible');
  }

  /**
   * Clica no botão de criar nova tarefa
   */
  clicarCriarTarefa(): void {
    cy.get(this.botaoCriarTarefa).click();
    // Aguarda formulário aparecer
    cy.get(this.campoTituloTarefa).should('be.visible');
  }

  /**
   * Preenche o formulário de tarefa
   * @param titulo - Título da tarefa
   * @param descricao - Descrição da tarefa
   * @param prioridade - Prioridade da tarefa
   */
  preencherFormularioTarefa(titulo: string, descricao: string, prioridade: string): void {
    cy.get(this.campoTituloTarefa).type(titulo);
    cy.get(this.campoDescricaoTarefa).type(descricao);
    cy.get(this.campoPrioridadeTarefa).select(prioridade);
  }

  /**
   * Salva a tarefa
   */
  salvarTarefa(): void {
    cy.get(this.botaoSalvarTarefa).click();
  }

  /**
   * Cria uma nova tarefa completa
   * @param titulo - Título da tarefa
   * @param descricao - Descrição da tarefa
   * @param prioridade - Prioridade da tarefa
   */
  criarTarefa(titulo: string, descricao: string, prioridade: string): void {
    this.clicarCriarTarefa();
    this.preencherFormularioTarefa(titulo, descricao, prioridade);
    this.salvarTarefa();
  }

  /**
   * Configura interceptação para requisição de criação de tarefa
   * Deve ser chamado ANTES de criar a tarefa
   */
  interceptarCriacaoTarefa(): void {
    cy.intercept('POST', '/api/tarefas').as('criarTarefa');
  }

  /**
   * Configura interceptação para requisição de atualização de tarefa
   * Deve ser chamado ANTES de atualizar a tarefa
   */
  interceptarAtualizacaoTarefa(): void {
    cy.intercept('PUT', '/api/tarefas/*').as('atualizarTarefa');
  }

  /**
   * Configura interceptação para requisição de deleção de tarefa
   * Deve ser chamado ANTES de deletar a tarefa
   */
  interceptarDelecaoTarefa(): void {
    cy.intercept('DELETE', '**/api/tarefas/*/delete').as('deletarTarefa');
  }

  /**
   * Valida mensagem de sucesso
   * @param mensagemEsperada - Mensagem esperada
   */
  validarMensagemSucesso(mensagemEsperada: string): void {
    cy.get(this.mensagemSucesso, { timeout: 5000 }).should('be.visible');
    cy.get(this.mensagemSucesso).should('contain', mensagemEsperada);
  }

  /**
   * Valida que a tarefa está visível na lista
   * @param tituloTarefa - Título da tarefa a ser validada
   */
  validarTarefaNaLista(tituloTarefa: string): void {
    const slugTarefa = tituloTarefa.toLowerCase().replace(/\s+/g, '-');
    cy.get(`[data-testid="tarefa-${slugTarefa}"]`).should('be.visible');
    cy.get(`[data-testid="tarefa-${slugTarefa}"]`).should('contain', tituloTarefa);
  }

  /**
   * Valida que a tarefa contém o texto esperado
   * @param tituloTarefa - Título da tarefa
   * @param textoEsperado - Texto esperado na tarefa
   */
  validarConteudoTarefa(tituloTarefa: string, textoEsperado: string): void {
    const slugTarefa = tituloTarefa.toLowerCase().replace(/\s+/g, '-');
    cy.get(`[data-testid="tarefa-${slugTarefa}"]`).should('contain', textoEsperado);
  }

  /**
   * Clica no botão de editar tarefa
   * @param tituloTarefa - Título da tarefa a ser editada
   */
  clicarEditarTarefa(tituloTarefa: string): void {
    const slugTarefa = tituloTarefa.toLowerCase().replace(/\s+/g, '-');
    cy.get(`[data-testid="tarefa-${slugTarefa}"]`)
      .find('[data-testid="botao-editar-tarefa"]')
      .click();
    // Aguarda formulário aparecer
    cy.get(this.campoTituloTarefa).should('be.visible');
  }

  /**
   * Atualiza o formulário de tarefa
   * @param titulo - Novo título da tarefa
   * @param descricao - Nova descrição da tarefa
   * @param prioridade - Nova prioridade da tarefa
   */
  atualizarFormularioTarefa(titulo: string, descricao: string, prioridade: string): void {
    cy.get(this.campoTituloTarefa).clear().type(titulo);
    cy.get(this.campoDescricaoTarefa).clear().type(descricao);
    cy.get(this.campoPrioridadeTarefa).select(prioridade);
  }

  /**
   * Atualiza uma tarefa completa
   * @param tituloAtual - Título atual da tarefa
   * @param novoTitulo - Novo título da tarefa
   * @param novaDescricao - Nova descrição da tarefa
   * @param novaPrioridade - Nova prioridade da tarefa
   */
  atualizarTarefa(tituloAtual: string, novoTitulo: string, novaDescricao: string, novaPrioridade: string): void {
    this.clicarEditarTarefa(tituloAtual);
    this.atualizarFormularioTarefa(novoTitulo, novaDescricao, novaPrioridade);
    this.salvarTarefa();
  }

  /**
   * Clica no botão de deletar tarefa
   * @param tituloTarefa - Título da tarefa a ser deletada
   */
  clicarDeletarTarefa(tituloTarefa: string): void {
    const slugTarefa = tituloTarefa.toLowerCase().replace(/\s+/g, '-');
    cy.get(`[data-testid="tarefa-${slugTarefa}"]`)
      .find('[data-testid="botao-deletar-tarefa"]')
      .first()
      .click();
  }

  /**
   * Confirma a deleção no diálogo de confirmação
   */
  confirmarDelecao(): void {
    // Cypress automaticamente aceita diálogos de confirmação
    // Mas podemos usar cy.window() para interceptar se necessário
    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(true);
    });
  }

  /**
   * Deleta uma tarefa completa
   * @param tituloTarefa - Título da tarefa a ser deletada
   * @deprecated Use clicarDeletarTarefa diretamente após configurar o stub do confirm
   */
  deletarTarefa(tituloTarefa: string): void {
    this.clicarDeletarTarefa(tituloTarefa);
  }

  /**
   * Valida que a tarefa não está mais na lista
   * @param tituloTarefa - Título da tarefa que não deve mais existir
   */
  validarTarefaNaoExiste(tituloTarefa: string): void {
    const slugTarefa = tituloTarefa.toLowerCase().replace(/\s+/g, '-');
    // Verifica que o elemento não existe, aguardando até que a lista seja atualizada
    cy.get('[data-testid="lista-tarefas"]', { timeout: 5000 }).should('be.visible');
    // Aguarda um pouco mais para garantir que a lista foi atualizada
    cy.wait(1000);
    // Verifica que não há nenhum elemento com esse data-testid na lista de tarefas
    cy.get('[data-testid="lista-tarefas"]').within(() => {
      cy.get(`[data-testid="tarefa-${slugTarefa}"]`).should('not.exist');
    });
  }

  /**
   * Deleta todas as tarefas existentes na lista
   */
  deletarTodasTarefas(): void {
    // Intercepta o diálogo de confirmação
    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(true);
    });

    // Intercepta requisições de deleção
    cy.intercept('DELETE', '**/api/tarefas/*/delete').as('deletarTarefa');
    cy.intercept('GET', '/api/tarefas').as('recarregarTarefas');

    // Obtém todas as tarefas da lista
    cy.get('[data-testid="lista-tarefas"]').then(($lista) => {
      // Encontra todos os botões de deletar
      cy.get('[data-testid="botao-deletar-tarefa"]').then(($botoes) => {
        const quantidade = $botoes.length;
        
        if (quantidade === 0) {
          cy.log('Nenhuma tarefa para deletar');
          return;
        }

        cy.log(`Deletando ${quantidade} tarefa(s)...`);

        // Deleta cada tarefa
        for (let i = 0; i < quantidade; i++) {
          cy.get('[data-testid="botao-deletar-tarefa"]').first().click();
          cy.wait('@deletarTarefa', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
          cy.wait('@recarregarTarefas', { timeout: 10000 });
          cy.wait(500); // Aguarda UI atualizar
        }
      });
    });

    // Valida que não há mais tarefas na lista
    cy.get('[data-testid="lista-tarefas"]').within(() => {
      cy.get('[data-testid*="tarefa-"]').should('not.exist');
    });
  }

  /**
   * Valida que não há tarefas na lista
   */
  validarListaVazia(): void {
    cy.get('[data-testid="lista-tarefas"]', { timeout: 5000 }).should('be.visible');
    cy.get('[data-testid="lista-tarefas"]').within(() => {
      cy.get('[data-testid*="tarefa-"]').should('not.exist');
    });
  }
}

