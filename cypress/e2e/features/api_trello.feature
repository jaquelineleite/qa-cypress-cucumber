Feature: API Trello

  Scenario: Consultar action do Trello com sucesso
    Given que envio uma requisição GET válida para API Trello
    Then devo validar status code 200
    And devo exibir o campo name da estrutura list

  Scenario: Consultar action do Trello inválida
    Given que envio uma requisição GET inválida para API Trello
    Then devo validar status code de erro