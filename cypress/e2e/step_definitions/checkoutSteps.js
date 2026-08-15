import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

import CartPage from "../../support/page_objects/cartPage";
import ProductsPage from "../../support/page_objects/productsPage";

Given("que estou logado no sistema", () => {
  cy.fixture("users").then((dados) => {
    cy.login(
      dados.validUser.email,
      dados.validUser.password
    );
  });

  cy.contains("Logged in as").should("be.visible");
});

Given("que possuo um produto no carrinho", () => {
  CartPage.limparCarrinho();

  ProductsPage.acessarTelaProdutos();
  ProductsPage.adicionarPrimeiroProdutoAoCarrinho();
  ProductsPage.visualizarCarrinho();

  CartPage.validarCarrinhoVisivel();
  CartPage.validarProdutoNoCarrinho();

});

When("acesso o checkout", () => {
  CartPage.clicarCheckout();

  CartPage.validarTelaCheckout();
});

Then("devo visualizar os dados do produto no resumo do pedido", () => {
  CartPage.validarResumoDoPedido();
  CartPage.salvarDadosDoProduto();

  cy.screenshot("checkout-produto-resumo-pedido");
});

When("adiciono uma observação ao pedido", () => {
  cy.fixture("users").then((dados) => {
    CartPage.preencherComentario(
      dados.checkout.orderComment
    );
  });
  });

When("avanço para o pagamento", () => {
  CartPage.clicarPlaceOrder();
  CartPage.validarTelaPagamento();
});

When("informo os dados de pagamento válidos", () => {
  cy.fixture("users").then((dados) => {
    CartPage.preencherDadosPagamento(
      dados.payment.nameOnCard,
      dados.payment.cardNumber,
      dados.payment.cvc,
      dados.payment.expiryMonth,
      dados.payment.expiryYear
    );
  });
});

When("confirmo o pagamento", () => {
  CartPage.clicarConfirmarPagamento();
});

Then(
  "devo visualizar a confirmação de pedido realizado com sucesso",
  () => {
    CartPage.validarPedidoRealizado();

    cy.screenshot("checkout-pedido-realizado");
  }
);

When(
  "tento confirmar o pagamento sem preencher os campos obrigatórios",
  () => {
    CartPage.clicarConfirmarPagamento();
  }
);

Then("o pedido não deve ser finalizado", () => {
  CartPage.validarPermanenciaNaTelaPagamento();
  CartPage.validarCamposObrigatorios();

  cy.screenshot("checkout-campos-obrigatorios");
});
