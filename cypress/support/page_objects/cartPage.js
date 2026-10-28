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

  };

  limparCarrinho() {
    cy.visit("/view_cart");
    cy.url().should("include", "/view_cart");

    const removerProduto = () => {
      cy.get("body").then(($body) => {
        const botao = $body.find(this.elementos.botaoRemoverProduto).first();

        if (!botao.length) {
          cy.get(this.elementos.linhaProduto).should("not.exist");
          return;
        }

        const linha = botao.closest("tr");
        const idLinha = linha.attr("id");

        if (!idLinha) {
          throw new Error("Produto do carrinho sem identificador de linha.");
        }

        cy.get(`[id="${idLinha}"]`)
          .find(this.elementos.botaoRemoverProduto)
          .click();

        cy.get(`[id="${idLinha}"]`).should("not.exist");

        removerProduto();
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

  cy.get("@nomeProdutoSelecionado").then((nomeEsperado) => {
    cy.get(this.elementos.nomeProduto)
      .first()
      .invoke("text")
      .then((nomeCarrinho) => {
        expect(nomeCarrinho.trim()).to.eq(nomeEsperado);
      });
  });

  cy.get("@precoProdutoSelecionado").then((precoEsperado) => {
    cy.get(this.elementos.precoProduto)
      .first()
      .invoke("text")
      .then((precoCarrinho) => {
        expect(precoCarrinho.trim()).to.eq(precoEsperado);
      });

    cy.get(this.elementos.totalProduto)
      .first()
      .invoke("text")
      .then((totalCarrinho) => {
        expect(totalCarrinho.trim()).to.eq(precoEsperado);
      });
  });

  cy.get(this.elementos.quantidadeProduto)
    .first()
    .invoke("text")
    .then((quantidade) => {
      expect(quantidade.trim()).to.eq("1");
    });
}

  clicarCheckout() {
    cy.get(this.elementos.botaoCheckout)
      .should("be.visible")
      .click();
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

}

export default new CartPage();

