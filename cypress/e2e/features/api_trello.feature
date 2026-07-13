Feature: API Trello

  Como consumidor da API
  Quero consultar uma ação do Trello
  Para validar o retorno do serviço

  Scenario: Consultar ação do Trello com sucesso
    Given que envio uma requisição GET válida para API Trello
    Then devo validar status code 200
    And devo exibir o campo name da estrutura list

  Scenario: Validar o tratamento de uma ação inexistente
    Given que envio uma requisição GET inválida para API Trello
    Then devo validar status code de erro