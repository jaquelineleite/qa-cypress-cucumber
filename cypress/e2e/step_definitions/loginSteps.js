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
  cy.screenshot("login-valido");
});

Then("devo visualizar uma mensagem de erro", () => {
  LoginPage.validarMensagemErro();
  cy.screenshot("login-invalido");
});

When("tento realizar login sem informar e-mail", () => {
  cy.env(["QA_LOGIN_PASSWORD"]).then(({ QA_LOGIN_PASSWORD }) => {
    cy.get('[data-qa="login-email"]').clear();
    LoginPage.preencherSenha(QA_LOGIN_PASSWORD);
    LoginPage.clicarEntrar();
  });
});

Then("o campo de e-mail deve impedir o envio do formulário", () => {
  cy.get('[data-qa="login-email"]').should(($campo) => {
    expect($campo.val()).to.eq("");
    expect($campo[0].validity.valueMissing).to.eq(true);
    expect($campo[0].checkValidity()).to.eq(false);
  });

  cy.url().should("include", "/login");
  cy.contains("Logged in as").should("not.exist");
});

When("tento realizar login sem informar senha", () => {
  cy.env(["QA_LOGIN_EMAIL"]).then(({ QA_LOGIN_EMAIL }) => {
    LoginPage.preencherEmail(QA_LOGIN_EMAIL);
    cy.get('[data-qa="login-password"]').clear();
    LoginPage.clicarEntrar();
  });
});

Then("o campo de senha deve impedir o envio do formulário", () => {
  cy.get('[data-qa="login-password"]').should(($campo) => {
    expect($campo.val()).to.eq("");
    expect($campo[0].validity.valueMissing).to.eq(true);
    expect($campo[0].checkValidity()).to.eq(false);
  });

  cy.url().should("include", "/login");
  cy.contains("Logged in as").should("not.exist");
});

When("tento realizar login com formato de e-mail inválido", () => {
  LoginPage.preencherEmail("email-invalido");
  LoginPage.preencherSenha("SenhaDeTeste123!");
  LoginPage.clicarEntrar();
});

Then("o campo de e-mail deve rejeitar o formato informado", () => {
  cy.get('[data-qa="login-email"]').should(($campo) => {
    expect($campo.val()).to.eq("email-invalido");
    expect($campo[0].validity.typeMismatch).to.eq(true);
    expect($campo[0].checkValidity()).to.eq(false);
  });

  cy.url().should("include", "/login");
  cy.contains("Logged in as").should("not.exist");
});
