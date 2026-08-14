class CartPage {
  elementos = {
    tabelaCarrinho: "#cart_info_table",
    linhaProduto: "#cart_info_table tbody tr",
    nomeProduto: ".cart_description h4 a",
    precoProduto: ".cart_price p",
    quantidadeProduto: ".cart_quantity button",
    totalProduto: ".cart_total_price",

    botaoRemoverProduto: ".cart_quantity_delete",
    botaoCheckout: ".check_out",

    resumoPedido: "#cart_info",
    comentarioPedido: "textarea[name='message']",
    botaoPlaceOrder: "a[href='/payment']",

    nomeCartao: "input[name='name_on_card']",
    numeroCartao: "input[name='card_number']",
    cvc: "input[name='cvc']",
    mesExpiracao: "input[name='expiry_month']",
    anoExpiracao: "input[name='expiry_year']",
    botaoConfirmarPagamento: "#submit",

    tituloPedidoConfirmado: "h2[data-qa='order-placed']",
  };

  limparCarrinho() {
    cy.visit("/view_cart");
    cy.url().should("include", "/view_cart");

    const removerProduto = () => {
      cy.get("body").then(($body) => {
        const botoes = $body.find(this.elementos.botaoRemoverProduto);

        if (botoes.length === 0) {
          return;
        }

        cy.wrap(botoes[0])
          .click()
          .then(() => {
            cy.get("body").should(($pagina) => {
              const quantidadeAtual = $pagina.find(
                this.elementos.botaoRemoverProduto
              ).length;

              expect(quantidadeAtual).to.be.lessThan(botoes.length);
            });

            removerProduto();
          });
      });
    };

    removerProduto();
  }

  acessarCarrinho() {
    cy.visit("/view_cart");
    cy.url().should("include", "/view_cart");
  }

  validarCarrinhoVisivel() {
    cy.url().should("include", "/view_cart");

    cy.get(this.elementos.tabelaCarrinho)
      .should("be.visible");
  }

  validarCarrinhoVazio() {
    cy.contains("Cart is empty!").should("be.visible");

    cy.get(this.elementos.linhaProduto)
      .should("not.exist");

    cy.get(this.elementos.botaoCheckout)
      .should("not.exist");
  }

  validarProdutoNoCarrinho() {
    cy.get(this.elementos.linhaProduto)
      .should("have.length.at.least", 1)
      .first()
      .should("be.visible");

    cy.get(this.elementos.nomeProduto)
      .first()
      .invoke("text")
      .then((nome) => {
        expect(nome.trim()).not.to.be.empty;
      });

    cy.get(this.elementos.precoProduto)
      .first()
      .invoke("text")
      .then((preco) => {
        expect(preco.trim()).to.match(/\d/);
      });

    cy.get(this.elementos.quantidadeProduto)
      .first()
      .invoke("text")
      .then((quantidade) => {
        expect(quantidade.trim()).to.equal("1");
      });

    cy.get(this.elementos.totalProduto)
      .first()
      .invoke("text")
      .then((total) => {
        expect(total.trim()).to.match(/\d/);
      });
  }

  clicarCheckout() {
    cy.get(this.elementos.botaoCheckout)
      .should("be.visible")
      .click();
  }

  validarTelaCheckout() {
    cy.url().should("include", "/checkout");

    cy.contains("h2", "Address Details")
      .should("be.visible");

    cy.contains("h2", "Review Your Order")
      .should("be.visible");
  }

  validarResumoDoPedido() {
    cy.get(this.elementos.resumoPedido)
      .should("be.visible");

    cy.get(this.elementos.nomeProduto)
      .first()
      .should("be.visible");

    cy.get(this.elementos.precoProduto)
      .first()
      .should("be.visible");

    cy.get(this.elementos.quantidadeProduto)
      .first()
      .should("be.visible");

    cy.get(this.elementos.totalProduto)
      .first()
      .should("be.visible");
  }

  salvarDadosDoProduto() {
    cy.get(this.elementos.nomeProduto)
      .first()
      .invoke("text")
      .then((nome) => {
        cy.wrap(nome.trim()).as("nomeProduto");
      });

    cy.get(this.elementos.precoProduto)
      .first()
      .invoke("text")
      .then((preco) => {
        cy.wrap(preco.trim()).as("precoProduto");
      });

    cy.get(this.elementos.quantidadeProduto)
      .first()
      .invoke("text")
      .then((quantidade) => {
        cy.wrap(quantidade.trim()).as("quantidadeProduto");
      });

    cy.get(this.elementos.totalProduto)
      .first()
      .invoke("text")
      .then((total) => {
        cy.wrap(total.trim()).as("totalProduto");
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
      .type(numeroCartao);

    cy.get(this.elementos.cvc)
      .clear()
      .type(cvc);

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

export default new CartPage();



