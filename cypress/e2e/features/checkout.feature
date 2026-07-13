Feature: Checkout

  Como cliente da loja
  Quero revisar o produto incluído no carrinho
  Para confirmar o pedido antes da finalização da compra

  Scenario: Validar o produto adicionado na tela de pagamento
    Given que estou logado no sistema
    And que acesso a tela de produtos
    When adiciono o primeiro produto ao carrinho
    And avanço para a tela de checkout
    Then devo visualizar o produto na tela de pagamento

  Scenario: Impedir checkout com carrinho vazio
    Given que acesso o carrinho diretamente
    Then não devo visualizar opção de checkout