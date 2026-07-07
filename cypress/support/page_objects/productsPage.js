class ProductsPage {
  acessarProdutos() {
    cy.visit("/products");
  }

  buscarProduto(produto) {
    cy.get("#search_product").clear().type(produto);
    cy.get("#submit_search").click();
  }

  validarProdutosRetornados() {
    cy.contains("Searched Products").should("be.visible");
    cy.get(".product-image-wrapper").should("have.length.greaterThan", 0);
  }

  validarSemProdutos() {
    cy.contains("Searched Products").should("be.visible");
    cy.get(".product-image-wrapper").should("have.length", 0);
  }

  adicionarPrimeiroProduto() {
    cy.get(".product-image-wrapper").first().trigger("mouseover");
    cy.get(".add-to-cart").first().click({ force: true });
  }

  clicarVerCarrinho() {
    cy.contains("View Cart").click();
  }
}

export default new ProductsPage();