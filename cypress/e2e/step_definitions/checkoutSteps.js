import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CartPage from "../../support/page_objects/cartPage";

Given("que estou logado no sistema", () => {
  cy.fixture("users").then((dados) => {
    cy.login(dados.validUser.email, dados.validUser.password);
  });
});

When("avanço para a tela de checkout", () => {
  CartPage.clicarCheckout();
});

Then("devo visualizar o produto na tela de pagamento", () => {
  cy.contains("Address Details").should("be.visible");
  cy.contains("Review Your Order").should("be.visible");
  cy.screenshot("produto-na-tela-pagamento");;
});

Then("não devo visualizar opção de checkout", () => {
  cy.contains("Proceed To Checkout").should("not.exist");
  cy.screenshot("checkout-sem-produto");;
});