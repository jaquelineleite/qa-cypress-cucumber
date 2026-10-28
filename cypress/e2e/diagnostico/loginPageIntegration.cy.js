import LoginPage from "../../support/page_objects/loginPage";

describe("Integração do LoginPage com o diagnóstico de ambiente", () => {
  it("deve identificar a verificação de segurança ao acessar o login", () => {
    cy.intercept("GET", "**/login", {
      statusCode: 200,
      headers: {
        "content-type": "text/html",
      },
      body: `
        <!DOCTYPE html>
        <html>
          <body>
            <h1>Please wait while your request is being verified</h1>
          </body>
        </html>
      `,
    }).as("paginaEmVerificacao");

    let erroEsperadoCapturado = false;

    cy.on("fail", (erro) => {
      if (
        erro.message.includes(
          "[AMBIENTE INDISPONÍVEL] VERIFICACAO DE SEGURANCA: ao acessar o login."
        )
      ) {
        erroEsperadoCapturado = true;
        return false;
      }

      throw erro;
    });

    LoginPage.acessarPaginaLogin();

    cy.then(() => {
      expect(
        erroEsperadoCapturado,
        "O diagnóstico deve identificar a verificação de segurança"
      ).to.equal(true);
    });
  });
});
