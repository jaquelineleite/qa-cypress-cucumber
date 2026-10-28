import fs from "node:fs";
import path from "node:path";

const reportsDir = path.resolve("cypress/reports");

fs.rmSync(reportsDir, { recursive: true, force: true });
fs.mkdirSync(reportsDir, { recursive: true });

console.log("Relatórios anteriores removidos. Diretório preparado para nova execução.");
