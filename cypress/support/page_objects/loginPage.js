class LoginPage {
  validarDisponibilidadeAmbiente(contexto) {
    cy.get("body").then(($body) => {
      if ($body.text().includes("This website is under heavy load")) {
        throw new Error(
          `[AMBIENTE INDISPONÍVEL] Aplicação possivelmente sobrecarregada: ${contexto}.`
        );
      }
    });
  }

  acessarPaginaLogin() {
    cy.visit("/login");

    this.validarDisponibilidadeAmbiente("ao acessar o login");
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
    this.validarDisponibilidadeAmbiente("durante a autenticação");

    cy.contains("Logged in as").should("be.visible");
  }

  validarMensagemErro() {
    cy.contains("Your email or password is incorrect!")
      .should("be.visible");
  }
}

export default new LoginPage();