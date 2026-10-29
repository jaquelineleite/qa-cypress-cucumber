import { interpretarRespostaJson } from "../../support/diagnostics/apiResponseDiagnostics";
import {
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

const URL_CADASTRO = "https://automationexercise.com/api/createAccount";

function enviarCadastroSemCampo(campo) {
  cy.fixture("users").then((users) => {
    const payload = {
      ...users.apiCreateAccountWithoutEmail,
      email: "qa-teste-invalido@example.com",
    };

    delete payload[campo];

    cy.request({
      method: "POST",
      url: URL_CADASTRO,
      form: true,
      failOnStatusCode: false,
      body: payload,
    }).then((res) => {
      cy.wrap(res).as("apiResponse");
    });
  });
}

Given("que envio uma requisição GET válida para API Trello", () => {
  cy.request({
    method: "GET",
    url: "https://api.trello.com/1/actions/592f11060f95a3d3d46a987a",
    failOnStatusCode: false,
  }).then((res) => {
    cy.wrap(res).as("apiResponse");

    const nomeLista = res.body?.data?.list?.name;

    cy.log(`Nome da lista: ${nomeLista}`);

    Cypress.log({
      name: "Trello list.name",
      message: nomeLista,
    });
  });
});

Then("devo validar status code 200", () => {
  cy.get("@apiResponse").then((response) => {
    expect(response.status).to.eq(200);
  });
});

Then("devo exibir o campo name da estrutura list", () => {
  cy.get("@apiResponse").then((response) => {
    expect(response.body).to.have.nested.property("data.list.name");

    expect(response.body.data.list.name)
      .to.be.a("string")
      .and.not.be.empty;

    cy.log(`Campo list.name: ${response.body.data.list.name}`);
  });
});

Given("que envio uma requisição GET inválida para API Trello", () => {
  cy.request({
    method: "GET",
    url: "https://api.trello.com/1/actions/id_invalido",
    failOnStatusCode: false,
  }).then((res) => {
    cy.wrap(res).as("apiResponse");
  });
});

Then("devo validar status code de erro", () => {
  cy.get("@apiResponse").then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body).to.eq("invalid id");
    expect(response.headers["content-type"]).to.include("text/plain");
  });
});

Given("que envio uma requisição POST sem o parâmetro email", () => {
  cy.fixture("users").then((users) => {
    cy.request({
      method: "POST",
      url: "https://automationexercise.com/api/createAccount",
      form: true,
      failOnStatusCode: false,
      body: users.apiCreateAccountWithoutEmail,
    }).then((res) => {
      cy.wrap(res).as("apiResponse");

    });
  });
});

Then("devo validar o status code da API de cadastro", () => {
  cy.get("@apiResponse").then((response) => {
    expect(response.status).to.eq(200);
  });
});

Then("devo validar a mensagem de parâmetro obrigatório ausente", () => {
  cy.get("@apiResponse").then((response) => {
    const corpo = interpretarRespostaJson(
      response,
      "validação de campos obrigatórios no cadastro"
    );

    expect(corpo).to.have.property("responseCode");
    expect(corpo.responseCode).to.eq(400);

    expect(corpo).to.have.property("message");
    expect(corpo.message.toLowerCase()).to.include("email");
    expect(corpo.message.toLowerCase()).to.include("missing");
  });
});

Given("que envio uma requisição POST sem o parâmetro password", () => {
  enviarCadastroSemCampo("password");
});

Then("devo validar o erro de parâmetro password obrigatório", () => {
  cy.get("@apiResponse").then((response) => {
    const corpo = interpretarRespostaJson(
      response,
      "validação de campos obrigatórios no cadastro"
    );

    expect(corpo.responseCode).to.eq(400);
    expect(corpo.message).to.eq(
      "Bad request, password parameter is missing in POST request."
    );
  });
});

Given("que envio uma requisição POST sem o parâmetro name", () => {
  enviarCadastroSemCampo("name");
});

Then("devo validar o erro de parâmetro name obrigatório", () => {
  cy.get("@apiResponse").then((response) => {
    const corpo = interpretarRespostaJson(
      response,
      "validação de campos obrigatórios no cadastro"
    );

    expect(corpo.responseCode).to.eq(400);
    expect(corpo.message).to.eq(
      "Bad request, name parameter is missing in POST request."
    );
  });
});
