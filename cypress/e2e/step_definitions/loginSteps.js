import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../support/page_objects/loginPage";

Given("que acesso a tela de login", () => {
  LoginPage.acessarPaginaLogin();
});

When("informo credenciais válidas", () => {
  cy.env(["QA_LOGIN_EMAIL", "QA_LOGIN_PASSWORD"]).then(({ QA_LOGIN_EMAIL, QA_LOGIN_PASSWORD }) => {
    LoginPage.preencherEmail(QA_LOGIN_EMAIL);
    LoginPage.preencherSenha(QA_LOGIN_PASSWORD);
    LoginPage.clicarEntrar();
  });
});
When("informo credenciais inválidas", () => {
  cy.fixture("users").then((dados) => {
    LoginPage.preencherEmail(dados.invalidUser.email);
    LoginPage.preencherSenha(dados.invalidUser.password);
    LoginPage.clicarEntrar();
  });
});

Then("devo visualizar o usuário autenticado", () => {
  LoginPage.validarLoginComSucesso();
  cy.screenshot("login-valido");;
});

Then("devo visualizar uma mensagem de erro", () => {
  LoginPage.validarMensagemErro();
  cy.screenshot("login-invalido");;;
});