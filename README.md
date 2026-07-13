# Framework de Automação de Testes - Cypress + Cucumber

## Descrição

Projeto desenvolvido como teste técnico para automação de testes **Web** e **API**, utilizando **Cypress**, **JavaScript** e **Cucumber (BDD)**, seguindo o padrão **Page Object Model (POM)**.

O objetivo deste projeto é demonstrar boas práticas de automação de testes, organização do framework, reutilização de código e validação de funcionalidades Web e API.

O projeto contempla todos os desafios propostos no teste técnico, incluindo cenários positivos e negativos, geração automática de evidências e organização baseada em BDD.

---

# Objetivo

Automatizar os fluxos solicitados no desafio técnico utilizando Cypress e Cucumber, implementando boas práticas como:

- BDD (Behavior Driven Development)
- Page Object Model (POM)
- Organização por Features
- Separação entre Features, Step Definitions e Page Objects
- Reutilização de código
- Massa de dados em Fixtures
- Evidências automatizadas

---

# Tecnologias utilizadas

- Cypress 15.17.0
- JavaScript
- Cucumber (BDD)
- Node.js 22+
- Page Object Model (POM)

---

# Estrutura do projeto

```text
qa-cypress-cucumber
│
├── cypress
│   ├── e2e
│   │   ├── features
│   │   │   ├── login.feature
│   │   │   ├── search.feature
│   │   │   ├── add_to_cart.feature
│   │   │   ├── checkout.feature
│   │   │   └── api_trello.feature
│   │   │
│   │   └── step_definitions
│   │       ├── loginSteps.js
│   │       ├── searchSteps.js
│   │       ├── cartSteps.js
│   │       ├── checkoutSteps.js
│   │       └── apiSteps.js
│   │
│   ├── fixtures
│   │   └── users.json
│   │
│   ├── evidencias
│   │
│   └── support
│       ├── page_objects
│       ├── commands.js
│       └── e2e.js
│
├── cypress.config.js
├── package.json
├── package-lock.json
├── README.md
└── .env.example
```

---

# Arquitetura

O projeto foi estruturado utilizando o padrão **Page Object Model (POM)**.

A arquitetura adotada proporciona:

- Separação das responsabilidades
- Reutilização de código
- Facilidade de manutenção
- Baixo acoplamento
- Maior legibilidade dos testes

---

# Padrão BDD

Os cenários foram escritos utilizando **Cucumber (Gherkin)** através das palavras-chave:

- Feature
- Scenario
- Given
- When
- Then
- And

Essa abordagem aproxima os testes da linguagem de negócio, facilitando a comunicação entre QA, Desenvolvimento e Negócio.

---

# Pré-requisitos

Antes de executar o projeto é necessário possuir instalado:

- Node.js 22 ou superior
- npm

---

# Instalação

Clone o repositório:

```bash
git clone https://github.com/jaquelineleite/qa-cypress-cucumber.git
```

Acesse a pasta:

```bash
cd qa-cypress-cucumber
```

Instale as dependências:

```bash
npm install
```

---

# Execução dos testes

## Executar todos os testes

```bash
npm run cy:run
```

## Executar em modo interativo

```bash
npx cypress open
```

## Executar apenas Login

```bash
npx cypress run --spec "cypress/e2e/features/login.feature"
```

## Executar apenas Busca

```bash
npx cypress run --spec "cypress/e2e/features/search.feature"
```

## Executar apenas Carrinho

```bash
npx cypress run --spec "cypress/e2e/features/add_to_cart.feature"
```

## Executar apenas Checkout

```bash
npx cypress run --spec "cypress/e2e/features/checkout.feature"
```

## Executar apenas API

```bash
npx cypress run --spec "cypress/e2e/features/api_trello.feature"
```

---

# Cenários automatizados

## Login

### Positivo

- Realizar login utilizando credenciais válidas.

### Negativo

- Impedir login utilizando credenciais inválidas.

---

## Busca

### Positivo

- Pesquisar produto existente.

### Negativo

- Pesquisar produto inexistente.

---

## Carrinho

### Positivo

- Adicionar produto ao carrinho.

### Negativo

- Validar carrinho vazio.

---

## Checkout

### Positivo

- Validar que o produto adicionado ao carrinho é apresentado corretamente na tela de pagamento.

### Negativo

- Impedir checkout quando o carrinho estiver vazio.

---

## API Trello

### Positivo

Realizar uma requisição GET para:

```
https://api.trello.com/1/actions/592f11060f95a3d3d46a987a
```

Validando:

- Status Code 200
- Campo `list.name`

### Negativo

Validar retorno utilizando uma URL inválida.

---

# Aplicação utilizada

https://www.automationexercise.com

---

# API utilizada

https://api.trello.com/1/actions/592f11060f95a3d3d46a987a

---

# Evidências

Durante a execução dos testes Web são gerados automaticamente screenshots para cada cenário executado.

As evidências ficam armazenadas em:

```text
cypress/evidencias/
```

Estrutura:

```text
login.feature/
search.feature/
add_to_cart.feature/
checkout.feature/
```

---

# Boas práticas aplicadas

- BDD com Cucumber
- Page Object Model (POM)
- Organização por Features
- Step Definitions
- Fixtures para massa de dados
- Reutilização de código
- Separação entre testes Web e API
- Evidências automáticas
- Código modularizado
- Fácil manutenção e escalabilidade

---

# Cobertura dos testes

O projeto contempla:

- ✅ 5 Features
- ✅ 10 Cenários automatizados
- ✅ Cenários positivos
- ✅ Cenários negativos
- ✅ Automação Web
- ✅ Automação de API REST
- ✅ Geração automática de evidências
- ✅ Arquitetura baseada em BDD + POM

Resultado da execução:

- 10 cenários executados
- 10 cenários aprovados
- 0 falhas

---

# Autor

**Jaqueline Fernandes de Andrade**

Analista de Qualidade de Software | QA Automation

Tecnologias:

- Cypress
- JavaScript
- Cucumber (BDD)
- API Testing
- Page Object Model (POM)
- Testes Web