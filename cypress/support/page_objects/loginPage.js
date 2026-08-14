class LoginPage {

  acessarPaginaLogin() {
    cy.visit("/login");
  }

  preencherEmail(email) {
    cy.get('[data-qa="login-email"]').clear().type(email);
  }

  preencherSenha(senha) {
    cy.get('[data-qa="login-password"]').clear().type(senha);
  }

  clicarEntrar() {
    cy.get('[data-qa="login-button"]').click();
  }

  validarLoginComSucesso() {
    cy.contains("Logged in as").should("be.visible");
  }

  validarMensagemErro() {
    cy.contains("Your email or password is incorrect!")
      .should("be.visible");
  }
}

export default new LoginPage();