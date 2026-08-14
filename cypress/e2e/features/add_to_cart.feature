Feature: Adicionar produto ao carrinho

  Scenario: Adicionar produto com sucesso
    Given que acesso a tela de produtos
    When adiciono o primeiro produto ao carrinho
    Then devo visualizar o produto no carrinho

  Scenario: Validar carrinho vazio
    Given que acesso o carrinho diretamente
    Then não devo visualizar produto no carrinho