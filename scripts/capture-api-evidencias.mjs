import fs from "node:fs";
import path from "node:path";

const outputDir = path.resolve(
  "cypress/evidencias/api_trello.feature"
);

const fixturePath = path.resolve(
  "cypress/fixtures/users.json"
);

const users = JSON.parse(
  fs.readFileSync(fixturePath, "utf8")
);

const templateGetPath = path.resolve(
  "scripts/templates/api-evidence-01.html"
);

const templatePostPath = path.resolve(
  "scripts/templates/api-evidence-02.html"
);

const getOutputPath = path.join(
  outputDir,
  "api-evidence-01.html"
);

const postOutputPath = path.join(
  outputDir,
  "api-evidence-02.html"
);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function preencherTemplate(template, dados) {
  return template
    .replaceAll("{{TITLE}}", escapeHtml(dados.title))
    .replaceAll("{{METHOD}}", escapeHtml(dados.method))
    .replaceAll("{{URL}}", escapeHtml(dados.url))
    .replaceAll("{{STATUS}}", escapeHtml(dados.status))
    .replaceAll("{{DATE_TIME}}", escapeHtml(dados.dateTime))
    .replaceAll("{{BUSINESS_RULE}}", escapeHtml(dados.businessRule))
    .replaceAll(
      "{{REQUEST_BODY}}",
      escapeHtml(
        JSON.stringify(dados.requestBody ?? {}, null, 2)
      )
    )
    .replaceAll(
      "{{RESPONSE_BODY}}",
      escapeHtml(
        JSON.stringify(dados.responseBody ?? {}, null, 2)
      )
    );
}

async function executarGetTrello() {
  const url =
    "https://api.trello.com/1/actions/592f11060f95a3d3d46a987a";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const responseBody = await response.json();

  const listName =
    responseBody?.data?.list?.name ?? "Campo não encontrado";

  return {
    title: "Evidência API GET Trello",
    method: "GET",
    url,
    status: `${response.status} ${response.statusText}`,
    dateTime: new Date().toISOString(),
    businessRule: `Campo data.list.name retornado: ${listName}`,
    requestBody: {},
    responseBody,
  };
}

async function executarPostAutomationExercise() {
  const url =
    "https://automationexercise.com/api/createAccount";

  const body = new URLSearchParams(
    users.apiCreateAccountWithoutEmail
  );

  const response = await fetch(url, {
    method: "POST",
    headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
  body,
  });

  const rawBody = await response.text();

  let responseBody;

  try {
    responseBody = JSON.parse(rawBody);
  } catch {
    responseBody = {
      rawResponse: rawBody,
    };
  }

  return {
    title: "Evidência API POST Automation Exercise",
    method: "POST",
    url,
    status: `${response.status} ${response.statusText}`,
    dateTime: new Date().toISOString(),
    businessRule:
      "Validação de parâmetro obrigatório ausente: email não enviado.",
    requestBody: Object.fromEntries(body.entries()),
    responseBody,
  };
}

async function main() {
  try {
    fs.mkdirSync(outputDir, {
      recursive: true,
    });

    const templateGet = fs.readFileSync(
      templateGetPath,
      "utf8"
    );

    const templatePost = fs.readFileSync(
      templatePostPath,
      "utf8"
    );

    const getEvidence = await executarGetTrello();
    const postEvidence =
      await executarPostAutomationExercise();

    fs.writeFileSync(
      getOutputPath,
      preencherTemplate(templateGet, getEvidence),
      "utf8"
    );

    fs.writeFileSync(
      postOutputPath,
      preencherTemplate(
        templatePost,
        postEvidence
      ),
      "utf8"
    );

    console.log(
      `Evidência GET gerada em: ${getOutputPath}`
    );

    console.log(
      `Evidência POST gerada em: ${postOutputPath}`
    );
  } catch (error) {
    console.error(
      "Falha ao gerar evidências de API:",
      error
    );

    process.exit(1);
  }
}

await main();