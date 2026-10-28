import { identificarIndisponibilidade } from "../../support/diagnostics/environmentDiagnostics";

describe("Diagnóstico de disponibilidade do ambiente", () => {
  it("deve identificar sobrecarga do ambiente", () => {
    expect(() =>
      identificarIndisponibilidade(
        "This website is under heavy load",
        "ao acessar o login"
      )
    ).to.throw("[AMBIENTE INDISPONÍVEL] SOBRECARGA: ao acessar o login.");
  });

  it("deve identificar verificação de segurança", () => {
    expect(() =>
      identificarIndisponibilidade(
        "Please wait while your request is being verified",
        "ao acessar produtos"
      )
    ).to.throw(
      "[AMBIENTE INDISPONÍVEL] VERIFICACAO DE SEGURANCA: ao acessar produtos."
    );
  });

  it("não deve sinalizar indisponibilidade em conteúdo normal", () => {
    expect(() =>
      identificarIndisponibilidade(
        "Logged in as Jaqueline",
        "durante a autenticação"
      )
    ).not.to.throw();
  });
});
