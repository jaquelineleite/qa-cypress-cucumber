import { validarDisponibilidadeAmbiente } from "../diagnostics/environmentDiagnostics";

class LoginPage {
  acessarPaginaLogin() {
    cy.visit("/login");

    validarDisponibilidadeAmbiente("ao acessar o login");
  }

  preencherEmail(email) {
    cy.get('[data-qa="login-email"]').clear().type(email);
  }

  preencherSenha(senha) {
    cy.get('[data-qa="login-password"]').clear().type(senha, { log: false });
  }

  clicarEntrar() {
    cy.get('[data-qa="login-button"]').click();
  }

  validarLoginComSucesso() {
    validarDisponibilidadeAmbiente("durante a autenticação");

    cy.contains("Logged in as").should("be.visible");
  }

  validarMensagemErro() {
    cy.contains("Your email or password is incorrect!")
      .should("be.visible");
  }
}

export default new LoginPage();