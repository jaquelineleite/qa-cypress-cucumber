Feature: Checkout

  Scenario: Validar produto na tela de pagamento
  Given que estou logado no sistema
  And que acesso a tela de produtos
  When adiciono o primeiro produto ao carrinho
  And avanço para a tela de checkout
  Then devo visualizar o produto na tela de pagamento

  Scenario: Tentar checkout sem produto
    Given que acesso o carrinho diretamente
    Then não devo visualizar opção de checkout