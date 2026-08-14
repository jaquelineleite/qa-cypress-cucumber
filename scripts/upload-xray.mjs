import "dotenv/config";
import fs from "node:fs";
import path from "node:path";

const reportPath = path.resolve(
  "cypress/reports/json/cucumber-report.json"
);

const {
  XRAY_CLIENT_ID,
  XRAY_CLIENT_SECRET,
  XRAY_API_URL = "https://xray.cloud.getxray.app/api/v2",
  XRAY_PROJECT_KEY,
} = process.env;

function validarArquivoRelatorio() {
  if (!fs.existsSync(reportPath)) {
    throw new Error(
      `Relatório Cucumber não encontrado em: ${reportPath}\n` +
        "Execute npm run cy:run antes do upload."
    );
  }
}

function possuiCredenciais() {
  return Boolean(XRAY_CLIENT_ID && XRAY_CLIENT_SECRET);
}

async function autenticarNoXray() {
  const response = await fetch(`${XRAY_API_URL}/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: XRAY_CLIENT_ID,
      client_secret: XRAY_CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    const body = await response.text();

    throw new Error(
      `Falha na autenticação do Xray. HTTP ${response.status}: ${body}`
    );
  }

  const token = await response.json();

  if (typeof token !== "string" || token.length === 0) {
    throw new Error("O Xray não retornou um token válido.");
  }

  return token;
}

async function enviarResultado(token) {
  const report = fs.readFileSync(reportPath, "utf8");

  const endpoint = XRAY_PROJECT_KEY
    ? `${XRAY_API_URL}/import/execution/cucumber?projectKey=${encodeURIComponent(
        XRAY_PROJECT_KEY
      )}`
    : `${XRAY_API_URL}/import/execution/cucumber`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: report,
  });

  const responseBody = await response.text();

  if (!response.ok) {
    throw new Error(
      `Falha no upload para o Xray. HTTP ${response.status}: ${responseBody}`
    );
  }

  return responseBody;
}

async function main() {
  try {
    validarArquivoRelatorio();

    if (!possuiCredenciais()) {
      console.log(
        "Upload para o Xray ignorado: XRAY_CLIENT_ID e XRAY_CLIENT_SECRET não foram configurados."
      );
      console.log(
        `Relatório disponível para upload em: ${reportPath}`
      );
      process.exit(0);
    }

    console.log("Autenticando no Xray...");
    const token = await autenticarNoXray();

    console.log("Enviando relatório Cucumber...");
    const resultado = await enviarResultado(token);

    console.log("Upload para o Xray concluído com sucesso.");
    console.log(resultado);
  } catch (error) {
    console.error(`Erro no upload para o Xray: ${error.message}`);
    process.exit(1);
  }
}

await main();