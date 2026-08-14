import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ProductsPage from "../../support/page_objects/productsPage";

Given("que acesso a tela de produtos", () => {
  ProductsPage.acessarProdutos();
});

When("busco por um produto existente", () => {
  ProductsPage.buscarProduto("Dress");
});

When("busco por um produto inexistente", () => {
  ProductsPage.buscarProduto("ProdutoInexistente123456");
});

Then("devo visualizar produtos retornados", () => {
  ProductsPage.validarProdutosRetornados();
cy.screenshot("busca-produto-existente");
});

Then("não devo visualizar produtos retornados", () => {
  ProductsPage.validarSemProdutos();
  cy.screenshot("busca-produto-inexistente");;
});