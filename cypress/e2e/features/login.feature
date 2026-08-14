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