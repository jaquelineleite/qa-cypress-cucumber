import test from "node:test";
import assert from "node:assert/strict";

import {
  redactSensitiveData,
} from "../scripts/utils/redact-sensitive-data.mjs";

test("deve mascarar senhas e tokens", () => {
  const dados = {
    password: "SenhaTeste123",
    access_token: "token-secreto",
    apiKey: "chave-secreta",
  };

  const resultado = redactSensitiveData(dados);

  assert.deepEqual(resultado, {
    password: "[REDACTED]",
    access_token: "[REDACTED]",
    apiKey: "[REDACTED]",
  });
});

test("deve proteger dados pessoais", () => {
  const dados = {
    firstname: "Maria",
    lastname: "Silva",
    mobile_number: "11999999999",
    address1: "Rua Exemplo, 123",
    zipcode: "01001000",
  };

  const resultado = redactSensitiveData(dados);

  for (const valor of Object.values(resultado)) {
    assert.equal(valor, "[REDACTED]");
  }
});

test("deve mascarar objetos e arrays aninhados", () => {
  const dados = {
    users: [
      {
        email: "teste@exemplo.com",
        profile: {
          password: "Senha123",
        },
      },
    ],
  };

  const resultado = redactSensitiveData(dados);

  assert.equal(resultado.users[0].email, "[REDACTED]");
  assert.equal(resultado.users[0].profile.password, "[REDACTED]");
});

test("deve preservar campos não sensíveis", () => {
  const dados = {
    status: 200,
    success: true,
    city: "São Paulo",
  };

  assert.deepEqual(redactSensitiveData(dados), dados);
});

test("não deve modificar o objeto original", () => {
  const dados = {
    password: "SenhaOriginal",
    nested: {
      token: "TokenOriginal",
    },
  };

  const resultado = redactSensitiveData(dados);

  assert.equal(dados.password, "SenhaOriginal");
  assert.equal(dados.nested.token, "TokenOriginal");

  assert.equal(resultado.password, "[REDACTED]");
  assert.equal(resultado.nested.token, "[REDACTED]");

  assert.notStrictEqual(resultado, dados);
  assert.notStrictEqual(resultado.nested, dados.nested);
});

test("deve mascarar tokens presentes em URLs", () => {
  const url = "https://api.exemplo.com/users?token=segredo123&status=active";
  const resultado = redactSensitiveData(url);

  assert.equal(resultado.includes("segredo123"), false);
  assert.equal(resultado.includes("status=active"), true);
});

test("deve mascarar Bearer token em texto livre", () => {
  const texto = "Authorization: Bearer token-secreto-123";
  const resultado = redactSensitiveData(texto);

  assert.equal(resultado.includes("token-secreto-123"), false);
  assert.equal(resultado.includes("Authorization: Bearer"), true);
});

test("deve mascarar multiplos parametros sensiveis na URL", () => {
  const url = "https://api.exemplo.com/users?token=segredo123&api_key=chave456&status=active";
  const resultado = redactSensitiveData(url);

  assert.equal(resultado.includes("segredo123"), false);
  assert.equal(resultado.includes("chave456"), false);
  assert.equal(resultado.includes("status=active"), true);
  assert.equal((resultado.match(/%5BREDACTED%5D/g) ?? []).length, 2);
});

test("deve mascarar credenciais embutidas na URL", () => {
  const url = "https://usuario:senha123@api.exemplo.com/recurso";
  const resultado = redactSensitiveData(url);

  assert.equal(resultado.includes("usuario"), false);
  assert.equal(resultado.includes("senha123"), false);
  assert.equal(resultado.includes("api.exemplo.com/recurso"), true);
});

test("deve mascarar tokens em fragmentos de URL", () => {
  const url = "https://api.exemplo.com/callback#access_token=segredo123&state=ativo";
  const resultado = redactSensitiveData(url);

  assert.equal(resultado.includes("segredo123"), false);
  assert.equal(resultado.includes("state=ativo"), true);
  assert.equal(resultado.includes("REDACTED"), true);
});

test("deve mascarar credenciais Basic Authentication em texto livre", () => {
  const entrada = "Authorization: Basic dXNlcjpwYXNz";
  const resultado = redactSensitiveData(entrada);

  assert.equal(resultado.includes("dXNlcjpwYXNz"), false);
  assert.equal(resultado.includes("Basic [REDACTED]"), true);
});
