Feature: Busca de produtos

  Como cliente da loja
  Quero pesquisar produtos
  Para localizar itens disponíveis para compra

  Scenario: Pesquisar um produto existente
    Given que acesso a tela de produtos
    When busco por um produto existente
    Then devo visualizar produtos retornados

  Scenario: Pesquisar um produto inexistente
    Given que acesso a tela de produtos
    When busco por um produto inexistente
    Then não devo visualizar produtos retornados