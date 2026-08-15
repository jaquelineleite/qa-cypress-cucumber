class ProductsPage {
  elementos = {
    campoBusca: "#search_product",
    botaoBuscar: "#submit_search",
    listaProdutos: ".product-image-wrapper",
    nomeProduto: ".productinfo p",
    precoProduto: ".productinfo h2",
    botaoAdicionarCarrinho: ".add-to-cart",
    modalProdutoAdicionado: "#cartModal",
    botaoVerCarrinho: "a[href='/view_cart']",
    tituloTodosProdutos: "h2.title.text-center",
    tituloProdutosBuscados: "h2.title.text-center",
  };

  acessarTelaProdutos() {
    cy.visit("/products");
    cy.url().should("include", "/products");

    cy.contains("h2", "All Products")
      .should("be.visible");
  }

  acessarProdutos() {
    this.acessarTelaProdutos();
  }

  buscarProduto(produto) {
    cy.get(this.elementos.campoBusca)
      .should("be.visible")
      .clear()
      .type(produto);

    cy.get(this.elementos.botaoBuscar)
      .should("be.visible")
      .click();
  }

  validarProdutosRetornados() {
    cy.contains("h2", "Searched Products")
      .should("be.visible");

    cy.get(this.elementos.listaProdutos)
      .should("have.length.greaterThan", 0);
  }

  validarProdutoCorrespondenteAoTermo(produto) {
    cy.get(this.elementos.listaProdutos)
      .first()
      .should("contain.text", produto);
  }

  validarSemProdutos() {
    cy.contains("h2", "Searched Products")
      .should("be.visible");

    cy.get(this.elementos.listaProdutos)
      .should("have.length", 0);
  }

  adicionarPrimeiroProduto() {
    this.adicionarPrimeiroProdutoAoCarrinho();
  }

  adicionarPrimeiroProdutoAoCarrinho() {
    cy.get(this.elementos.listaProdutos)
      .first()
      .find(this.elementos.nomeProduto)
      .invoke("text")
      .then((nome) => {
        cy.wrap(nome.trim()).as("nomeProdutoSelecionado");
      });

    cy.get(this.elementos.listaProdutos)
      .first()
      .find(this.elementos.precoProduto)
      .invoke("text")
      .then((preco) => {
        cy.wrap(preco.trim()).as("precoProdutoSelecionado");
      });

    cy.get(this.elementos.listaProdutos)
      .first()
      .scrollIntoView()
      .trigger("mouseover");

    cy.get(this.elementos.listaProdutos)
      .first()
      .find(this.elementos.botaoAdicionarCarrinho)
      .first()
      .click({ force: true });

    cy.get(this.elementos.modalProdutoAdicionado)
      .should("be.visible");

    cy.contains("Added!")
      .should("be.visible");
  }

  clicarVerCarrinho() {
    this.visualizarCarrinho();
  }

  visualizarCarrinho() {
    cy.get(this.elementos.modalProdutoAdicionado)
      .should("be.visible")
      .within(() => {
        cy.contains("View Cart")
          .should("be.visible")
          .click();
      });

    cy.url().should("include", "/view_cart");
  }
}

export default new ProductsPage();