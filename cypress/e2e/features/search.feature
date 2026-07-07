Feature: Busca de produtos

  Scenario: Buscar produto existente
    Given que acesso a tela de produtos
    When busco por um produto existente
    Then devo visualizar produtos retornados

  Scenario: Buscar produto inexistente
    Given que acesso a tela de produtos
    When busco por um produto inexistente
    Then não devo visualizar produtos retornados