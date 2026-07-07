import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

let response;

Given("que envio uma requisição GET válida para API Trello", () => {
  cy.request({
    method: "GET",
    url: "https://api.trello.com/1/actions/592f11060f95a3d3d46a987a",
    failOnStatusCode: false
  }).then((res) => {
    response = res;
    cy.log(`Nome da lista: ${res.body.data.list.name}`);
  });
});

Then("devo validar status code 200", () => {
  expect(response.status).to.eq(200);
});

Then("devo exibir o campo name da estrutura list", () => {
  expect(response.body.data.list.name).to.exist;
  cy.log(`Campo list.name: ${response.body.data.list.name}`);
});

Given("que envio uma requisição GET inválida para API Trello", () => {
  cy.request({
    method: "GET",
    url: "https://api.trello.com/1/actions/id_invalido",
    failOnStatusCode: false
  }).then((res) => {
    response = res;
  });
});

Then("devo validar status code de erro", () => {
  expect(response.status).to.be.oneOf([400, 404]);
});