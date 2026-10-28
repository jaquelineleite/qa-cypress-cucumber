class PaymentPage {
  elementos = {
    nomeCartao: "input[name='name_on_card']",
    numeroCartao: "input[name='card_number']",
    cvc: "input[name='cvc']",
    mesExpiracao: "input[name='expiry_month']",
    anoExpiracao: "input[name='expiry_year']",
    botaoConfirmarPagamento: "#submit",
    tituloPedidoConfirmado: "h2[data-qa='order-placed']",
  };

  validarTelaPagamento() {
    cy.url().should("include", "/payment");

    cy.contains("Payment")
      .should("be.visible");

    cy.get(this.elementos.nomeCartao)
      .should("be.visible");

    cy.get(this.elementos.numeroCartao)
      .should("be.visible");
  }

  preencherDadosPagamento(nomeCartao, numeroCartao, cvc, mes, ano) {
    cy.get(this.elementos.nomeCartao)
      .clear()
      .type(nomeCartao);

    cy.get(this.elementos.numeroCartao)
      .clear()
      .type(numeroCartao, { log: false });

    cy.get(this.elementos.cvc)
      .clear()
      .type(cvc, { log: false });

    cy.get(this.elementos.mesExpiracao)
      .clear()
      .type(mes);

    cy.get(this.elementos.anoExpiracao)
      .clear()
      .type(ano);
  }

  clicarConfirmarPagamento() {
    cy.get(this.elementos.botaoConfirmarPagamento)
      .should("be.visible")
      .click();
  }

  validarPedidoRealizado() {
    cy.url().should("include", "/payment_done");

    cy.get(this.elementos.tituloPedidoConfirmado)
      .should("be.visible")
      .and("contain.text", "Order Placed");

    cy.contains(
      "Congratulations! Your order has been confirmed!"
    ).should("be.visible");
  }

  validarPermanenciaNaTelaPagamento() {
    cy.url().should("include", "/payment");

    cy.get(this.elementos.tituloPedidoConfirmado)
      .should("not.exist");
  }

  validarCamposObrigatorios() {
    cy.get(this.elementos.nomeCartao)
      .should("have.value", "")
      .then(($campo) => {
        expect($campo[0].checkValidity()).to.equal(false);
      });

    cy.get(this.elementos.numeroCartao)
      .should("have.value", "")
      .then(($campo) => {
        expect($campo[0].checkValidity()).to.equal(false);
      });

    cy.get(this.elementos.cvc)
      .should("have.value", "")
      .then(($campo) => {
        expect($campo[0].checkValidity()).to.equal(false);
      });

    cy.get(this.elementos.mesExpiracao)
      .should("have.value", "")
      .then(($campo) => {
        expect($campo[0].checkValidity()).to.equal(false);
      });

    cy.get(this.elementos.anoExpiracao)
      .should("have.value", "")
      .then(($campo) => {
        expect($campo[0].checkValidity()).to.equal(false);
      });
  }
}

export default new PaymentPage();
