Feature: Login

  Como usuário do sistema
  Quero realizar login
  Para acessar minha conta

  Scenario: Login válido
    Given que acesso a tela de login
    When informo credenciais válidas
    Then devo visualizar o usuário autenticado

  Scenario: Login inválido
    Given que acesso a tela de login
    When informo credenciais inválidas
    Then devo visualizar uma mensagem de erro