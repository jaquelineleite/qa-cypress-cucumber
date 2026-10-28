export function interpretarRespostaJson(response, contexto) {
  const corpo = response.body;

  if (corpo !== null && typeof corpo === "object" && !Array.isArray(corpo)) {
    return corpo;
  }

  if (typeof corpo !== "string") {
    throw new Error(
      `[RESPOSTA API INESPERADA] Corpo inválido: ${contexto}.`
    );
  }

  const conteudo = corpo.trim();
  const contentType = String(
    response.headers?.["content-type"] || "não informado"
  );

  if (/^(<!doctype html|<html\b)/i.test(conteudo)) {
    throw new Error(
      `[RESPOSTA API INESPERADA] HTML recebido no lugar de JSON: ${contexto}. HTTP ${response.status}; Content-Type: ${contentType}.`
    );
  }

  let json;

  try {
    json = JSON.parse(conteudo);
  } catch (erro) {
    throw new Error(
      `[RESPOSTA API INESPERADA] JSON inválido: ${contexto}. HTTP ${response.status}; Content-Type: ${contentType}. Detalhe: ${erro.message}`
    );
  }

  if (json === null || typeof json !== "object" || Array.isArray(json)) {
    throw new Error(
      `[RESPOSTA API INESPERADA] JSON válido, mas o corpo não é um objeto: ${contexto}. HTTP ${response.status}; Content-Type: ${contentType}.`
    );
  }

  return json;
}
