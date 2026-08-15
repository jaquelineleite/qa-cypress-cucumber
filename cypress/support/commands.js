import LoginPage from "./page_objects/loginPage";

Cypress.Commands.add("login", (email, password) => {
  LoginPage.acessarPaginaLogin();
  LoginPage.preencherEmail(email);
  LoginPage.preencherSenha(password);
  LoginPage.clicarEntrar();
  LoginPage.validarLoginComSucesso();
});