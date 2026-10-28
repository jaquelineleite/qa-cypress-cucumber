Feature: Login

  Como usuário da aplicação
  Quero realizar autenticação
  Para acessar minha conta

  Scenario: Realizar login com credenciais válidas
    Given que acesso a tela de login
    When informo credenciais válidas
    Then devo visualizar o usuário autenticado

  Scenario: Impedir login com credenciais inválidas
    Given que acesso a tela de login
    When informo credenciais inválidas
    Then devo visualizar uma mensagem de erro

  Scenario: Impedir login sem informar e-mail
    Given que acesso a tela de login
    When tento realizar login sem informar e-mail
    Then o campo de e-mail deve impedir o envio do formulário

  Scenario: Impedir login sem informar senha
    Given que acesso a tela de login
    When tento realizar login sem informar senha
    Then o campo de senha deve impedir o envio do formulário

  Scenario: Impedir login com formato de e-mail inválido
    Given que acesso a tela de login
    When tento realizar login com formato de e-mail inválido
    Then o campo de e-mail deve rejeitar o formato informado
