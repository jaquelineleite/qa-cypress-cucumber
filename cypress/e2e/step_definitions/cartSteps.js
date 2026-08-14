import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

import ProductsPage from "../../support/page_objects/productsPage";
import CartPage from "../../support/page_objects/cartPage";

Given("que acesso o carrinho diretamente", () => {
  CartPage.limparCarrinho();
  CartPage.acessarCarrinho();
});

When("adiciono o primeiro produto ao carrinho", () => {
  ProductsPage.acessarTelaProdutos();
  ProductsPage.adicionarPrimeiroProdutoAoCarrinho();
  ProductsPage.visualizarCarrinho();
});

Then("devo visualizar o produto no carrinho", () => {
  CartPage.validarProdutoNoCarrinho();
  cy.screenshot("produto-adicionado");
});

Then("não devo visualizar produto no carrinho", () => {
  CartPage.validarCarrinhoVazio();
  cy.screenshot("carrinho-vazio");
});