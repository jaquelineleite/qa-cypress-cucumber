Feature: API de cadastro de usuários - Automation Exercise

  Como consumidor da API de cadastro
  Quero validar as regras de obrigatoriedade dos campos
  Para garantir o tratamento correto de requisições inválidas

  Scenario: Validar parâmetros obrigatórios no cadastro de usuário
    Given que envio uma requisição POST sem o parâmetro email
    Then devo validar o status code da API de cadastro
    And devo validar a mensagem de parâmetro obrigatório ausente
