import report from "multiple-cucumber-html-reporter";
import fs from "node:fs";
import path from "node:path";

const jsonDir = path.resolve("cypress/reports/json");
const outputDir = path.resolve("cypress/reports/html");

if (!fs.existsSync(jsonDir)) {
  console.error(
    `Diretório de resultados não encontrado: ${jsonDir}\n` +
      "Execute os testes antes de gerar o relatório."
  );
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

report.generate({
  jsonDir,
  reportPath: outputDir,
  metadata: {
    browser: {
      name: "chrome",
      version: "latest",
    },
    device: "Local test machine",
    platform: {
      name: process.platform,
      version: process.version,
    },
  },
  customData: {
    title: "Relatório de execução",
    data: [
      { label: "Projeto", value: "HCXpert QA Automation Challenge" },
      { label: "Framework", value: "Cypress + Cucumber" },
      { label: "Ambiente", value: process.env.TEST_ENV || "local" },
    ],
  },
});

console.log(`Relatório gerado em: ${outputDir}`);