class CartPage {
  acessarCarrinho() {
    cy.visit("/view_cart");
  }

  validarProdutoNoCarrinho() {
    cy.get(".cart_info").should("be.visible");
    cy.get(".cart_description").should("have.length.greaterThan", 0);
  }

  validarCarrinhoVazio() {
    cy.get("body").should("not.contain", "Proceed To Checkout");
  }

  clicarCheckout() {
    cy.contains("Proceed To Checkout").click();
  }
}

export default new CartPage();