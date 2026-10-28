class CheckoutPage {
  elementos = {
    resumoPedido: "#cart_info",
    nomeProduto: ".cart_description h4 a",
    precoProduto: ".cart_price p",
    quantidadeProduto: ".cart_quantity button",
    totalProduto: ".cart_total_price",
    comentarioPedido: "textarea[name='message']",
    botaoPlaceOrder: "a[href='/payment']",
  };

  validarTelaCheckout() {
    cy.url().should("include", "/checkout");

    cy.contains("h2", "Address Details")
      .should("be.visible");

    cy.contains("h2", "Review Your Order")
      .should("be.visible");
  }

  validarResumoDoPedido() {
    cy.get(this.elementos.resumoPedido).should("be.visible");

    const campos = [
      ["nomeProduto", this.elementos.nomeProduto, "Nome do produto"],
      ["precoProduto", this.elementos.precoProduto, "Preco do produto"],
      ["quantidadeProduto", this.elementos.quantidadeProduto, "Quantidade"],
      ["totalProduto", this.elementos.totalProduto, "Total do pedido"],
    ];

    campos.forEach(([alias, seletor, descricao]) => {
      cy.get(`@${alias}`).then((valorEsperado) => {
        cy.get(this.elementos.resumoPedido)
          .find(seletor)
          .first()
          .should("be.visible")
          .invoke("text")
          .then((valorAtual) => {
            expect(
              valorAtual.trim(),
              `${descricao}: carrinho versus checkout`
            ).to.eq(valorEsperado);
          });
      });
    });
  }

  preencherComentario(comentario) {
    cy.get(this.elementos.comentarioPedido)
      .should("be.visible")
      .clear()
      .type(comentario);
  }

  clicarPlaceOrder() {
    cy.get(this.elementos.botaoPlaceOrder)
      .should("be.visible")
      .click();
  }
}

export default new CheckoutPage();
