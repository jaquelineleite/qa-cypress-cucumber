import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ProductsPage from "../../support/page_objects/productsPage";

Given("que acesso a tela de produtos", () => {
  ProductsPage.acessarProdutos();
});

When("busco por um produto existente", () => {
  cy.fixture("users").then((dados) => {
    ProductsPage.buscarProduto(dados.search.existingProduct);
  });
});

When("busco por um produto inexistente", () => {
  cy.fixture("users").then((dados) => {
    ProductsPage.buscarProduto(dados.search.nonExistingProduct);
  });
});

Then("devo visualizar produtos retornados", () => {
  cy.fixture("users").then((dados) => {
    ProductsPage.validarProdutosRetornados();
    ProductsPage.validarProdutoCorrespondenteAoTermo(
      dados.search.existingProduct
    );

    cy.screenshot("busca-produto-existente");
  });
});

Then("não devo visualizar produtos retornados", () => {
  ProductsPage.validarSemProdutos();
  cy.screenshot("busca-produto-inexistente");
});