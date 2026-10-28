Feature: APIs REST

  Como consumidor das APIs
  Quero validar os serviços REST
  Para garantir o correto funcionamento das integrações

  Scenario: Consultar ação do Trello com sucesso
    Given que envio uma requisição GET válida para API Trello
    Then devo validar status code 200
    And devo exibir o campo name da estrutura list

  Scenario: Validar o tratamento de uma ação inexistente no Trello
    Given que envio uma requisição GET inválida para API Trello
    Then devo validar status code de erro
