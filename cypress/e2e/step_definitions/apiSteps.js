import {
  Given,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

let response;

Given("que envio uma requisição GET válida para API Trello", () => {
  cy.request({
    method: "GET",
    url: "https://api.trello.com/1/actions/592f11060f95a3d3d46a987a",
    failOnStatusCode: false,
  }).then((res) => {
    response = res;

    const nomeLista = res.body?.data?.list?.name;

    cy.log(`Nome da lista: ${nomeLista}`);

    Cypress.log({
      name: "Trello list.name",
      message: nomeLista,
    });
  });
});

Then("devo validar status code 200", () => {
  expect(response.status).to.eq(200);
});

Then("devo exibir o campo name da estrutura list", () => {
  expect(response.body).to.have.nested.property("data.list.name");

  expect(response.body.data.list.name)
    .to.be.a("string")
    .and.not.be.empty;

  cy.log(`Campo list.name: ${response.body.data.list.name}`);
});

Given("que envio uma requisição GET inválida para API Trello", () => {
  cy.request({
    method: "GET",
    url: "https://api.trello.com/1/actions/id_invalido",
    failOnStatusCode: false,
  }).then((res) => {
    response = res;
  });
});

Then("devo validar status code de erro", () => {
 expect(response.status).to.eq(400);
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
      response = res;

      cy.log(`Resposta createAccount: ${JSON.stringify(res.body)}`);
    });
  });
});

Then("devo validar o status code da API de cadastro", () => {
  expect(response.status).to.eq(200);
});

Then("devo validar a mensagem de parâmetro obrigatório ausente", () => {
  const corpo =
    typeof response.body === "string"
      ? JSON.parse(response.body)
      : response.body;

  expect(corpo).to.have.property("responseCode");
  expect(corpo.responseCode).to.eq(400);

  expect(corpo).to.have.property("message");
  expect(corpo.message.toLowerCase()).to.include("email");
  expect(corpo.message.toLowerCase()).to.include("missing");
});