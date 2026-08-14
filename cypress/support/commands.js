Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");

  cy.get('[data-qa="login-email"]').clear().type(email);

  cy.get('[data-qa="login-password"]').clear().type(password);

  cy.get('[data-qa="login-button"]').click();
});