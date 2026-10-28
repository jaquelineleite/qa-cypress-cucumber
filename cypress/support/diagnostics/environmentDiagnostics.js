const INDICADORES_INDISPONIBILIDADE = [
  {
    mensagem: "This website is under heavy load",
    classificacao: "SOBRECARGA",
  },
  {
    mensagem: "Please wait while your request is being verified",
    classificacao: "VERIFICACAO DE SEGURANCA",
  },
];

export function identificarIndisponibilidade(conteudo, contexto) {
  const indicador = INDICADORES_INDISPONIBILIDADE.find(({ mensagem }) =>
    conteudo.includes(mensagem)
  );

  if (indicador) {
    throw new Error(
      `[AMBIENTE INDISPONÍVEL] ${indicador.classificacao}: ${contexto}.`
    );
  }
}

export function validarDisponibilidadeAmbiente(contexto) {
  cy.get("body").then(($body) => {
    identificarIndisponibilidade($body.text(), contexto);
  });
}
