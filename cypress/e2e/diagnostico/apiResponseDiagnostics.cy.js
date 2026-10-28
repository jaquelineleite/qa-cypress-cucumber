import { interpretarRespostaJson } from "../../support/diagnostics/apiResponseDiagnostics";

describe("Diagnóstico de respostas de API", () => {
  const resposta = (body, contentType = "application/json") => ({
    status: 200,
    headers: { "content-type": contentType },
    body,
  });

  it("deve aceitar um objeto JSON", () => {
    const corpo = interpretarRespostaJson(
      resposta({ responseCode: 400, message: "Bad request" }),
      "cadastro sem email"
    );

    expect(corpo.responseCode).to.equal(400);
  });

  it("deve converter uma string JSON válida", () => {
    const corpo = interpretarRespostaJson(
      resposta('{"responseCode":400,"message":"Bad request"}'),
      "cadastro sem senha"
    );

    expect(corpo.responseCode).to.equal(400);
  });

  it("deve identificar HTML inesperado", () => {
    expect(() =>
      interpretarRespostaJson(
        resposta("<!DOCTYPE html><html></html>", "text/html"),
        "cadastro sem nome"
      )
    ).to.throw("HTML recebido no lugar de JSON");
  });

  it("deve identificar JSON com sintaxe inválida", () => {
    expect(() =>
      interpretarRespostaJson(
        resposta('{"responseCode":'),
        "cadastro sem email"
      )
    ).to.throw("JSON inválido");
  });

  it("deve rejeitar JSON válido com formato incompatível", () => {
    expect(() =>
      interpretarRespostaJson(
        resposta("[1,2,3]"),
        "cadastro sem senha"
      )
    ).to.throw("JSON válido, mas o corpo não é um objeto");
  });
});
