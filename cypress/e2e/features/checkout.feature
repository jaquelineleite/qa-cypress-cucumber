Feature: Checkout
  Como cliente autenticado da loja
  Quero finalizar a compra dos produtos adicionados ao carrinho
  Para concluir meu pedido com segurança

  Scenario: Finalizar compra com dados de pagamento válidos
    Given que estou logado no sistema
    And que possuo um produto no carrinho
    When acesso o checkout
    Then devo visualizar os dados do produto no resumo do pedido
    When adiciono uma observação ao pedido
    And avanço para o pagamento
    And informo os dados de pagamento válidos
    And confirmo o pagamento
    Then devo visualizar a confirmação de pedido realizado com sucesso

  Scenario: Impedir pagamento sem preencher os dados obrigatórios
    Given que estou logado no sistema
    And que possuo um produto no carrinho
    When acesso o checkout
    And avanço para o pagamento
    And tento confirmar o pagamento sem preencher os campos obrigatórios
    Then o pedido não deve ser finalizado