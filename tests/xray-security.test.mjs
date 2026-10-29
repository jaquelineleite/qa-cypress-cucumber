import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

function executarXray(cenario) {
  const diretorio = mkdtempSync(path.join(tmpdir(), "xray-security-"));
  const relatorio = path.join(
    diretorio,
    "cypress/reports/json/cucumber-report.json"
  );

  mkdirSync(path.dirname(relatorio), { recursive: true });
  writeFileSync(relatorio, "[]", "utf8");

  const codigo = `
    const segredo = "SEGREDO_FICTICIO_NAO_EXIBIR";

    globalThis.fetch = async (url) => {
      if (String(url).endsWith("/authenticate")) {
        if ("${cenario}" === "auth-error") {
          return new Response(segredo, { status: 401 });
        }

        return new Response(JSON.stringify("token-ficticio"), {
          status: 200,
          headers: { "content-type": "application/json" }
        });
      }

      if ("${cenario}" === "upload-error") {
        return new Response(segredo, { status: 500 });
      }

      return new Response(segredo, { status: 200 });
    };

    await import(${JSON.stringify(new URL("../scripts/upload-xray.mjs", import.meta.url).href)});
  `;

  try {
    return spawnSync(process.execPath, ["--input-type=module", "-e", codigo], {
      cwd: diretorio,
      encoding: "utf8",
      env: {
        ...process.env,
        XRAY_CLIENT_ID: "id-ficticio",
        XRAY_CLIENT_SECRET: "secret-ficticio",
        XRAY_API_URL: "https://xray.example.test/api/v2",
      },
    });
  } finally {
    rmSync(diretorio, { recursive: true, force: true });
  }
}

test("não deve expor dados em falha de autenticação", () => {
  const resultado = executarXray("auth-error");
  const logs = resultado.stdout + resultado.stderr;

  assert.equal(resultado.status, 1);
  assert.match(logs, /HTTP 401/);
  assert.doesNotMatch(logs, /SEGREDO_FICTICIO_NAO_EXIBIR/);
});

test("não deve expor dados em falha de upload", () => {
  const resultado = executarXray("upload-error");
  const logs = resultado.stdout + resultado.stderr;

  assert.equal(resultado.status, 1);
  assert.match(logs, /HTTP 500/);
  assert.doesNotMatch(logs, /SEGREDO_FICTICIO_NAO_EXIBIR/);
});

test("não deve expor dados em upload bem-sucedido", () => {
  const resultado = executarXray("success");
  const logs = resultado.stdout + resultado.stderr;

  assert.equal(resultado.status, 0);
  assert.match(logs, /Status HTTP do upload: 200/);
  assert.doesNotMatch(logs, /SEGREDO_FICTICIO_NAO_EXIBIR/);
});
