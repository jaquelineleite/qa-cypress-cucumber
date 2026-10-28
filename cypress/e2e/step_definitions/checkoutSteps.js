import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

import CartPage from "../../support/page_objects/cartPage";
import CheckoutPage from "../../support/page_objects/checkoutPage";
import PaymentPage from "../../support/page_objects/paymentPage";
import ProductsPage from "../../support/page_objects/productsPage";

Given("que estou logado no sistema", () => {
  cy.env(["QA_LOGIN_EMAIL", "QA_LOGIN_PASSWORD"]).then(({ QA_LOGIN_EMAIL, QA_LOGIN_PASSWORD }) => {
    cy.login(QA_LOGIN_EMAIL, QA_LOGIN_PASSWORD);
    cy.contains("Logged in as").should("be.visible");
  });
});

Given("que possuo um produto no carrinho", () => {
  CartPage.limparCarrinho();

  ProductsPage.acessarTelaProdutos();
  ProductsPage.adicionarPrimeiroProdutoAoCarrinho();
  ProductsPage.visualizarCarrinho();

  CartPage.validarCarrinhoVisivel();
  CartPage.validarProdutoNoCarrinho();
  CartPage.salvarDadosDoProduto();

});

When("acesso o checkout", () => {
  CartPage.clicarCheckout();

  CheckoutPage.validarTelaCheckout();
});

Then("devo visualizar os dados do produto no resumo do pedido", () => {
  CheckoutPage.validarResumoDoPedido();

  cy.screenshot("checkout-produto-resumo-pedido");
});

When("adiciono uma observação ao pedido", () => {
  cy.fixture("users").then((dados) => {
    CheckoutPage.preencherComentario(
      dados.checkout.orderComment
    );
  });
  });

When("avanço para o pagamento", () => {
  CheckoutPage.clicarPlaceOrder();
  PaymentPage.validarTelaPagamento();
});

When("informo os dados de pagamento válidos", () => {
  cy.fixture("users").then((dados) => {
    PaymentPage.preencherDadosPagamento(
      dados.payment.nameOnCard,
      dados.payment.cardNumber,
      dados.payment.cvc,
      dados.payment.expiryMonth,
      dados.payment.expiryYear
    );
  });
});

When("confirmo o pagamento", () => {
  PaymentPage.clicarConfirmarPagamento();
});

Then(
  "devo visualizar a confirmação de pedido realizado com sucesso",
  () => {
    PaymentPage.validarPedidoRealizado();

    cy.screenshot("checkout-pedido-realizado");
  }
);

When(
  "tento confirmar o pagamento sem preencher os campos obrigatórios",
  () => {
    PaymentPage.clicarConfirmarPagamento();
  }
);

Then("o pedido não deve ser finalizado", () => {
  PaymentPage.validarPermanenciaNaTelaPagamento();
  PaymentPage.validarCamposObrigatorios();

  cy.screenshot("checkout-campos-obrigatorios");
});
