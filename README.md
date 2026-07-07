# Framework de Automação de Testes - Cypress + Cucumber

## Descrição

Projeto desenvolvido como teste técnico para automação de testes Web e API utilizando **Cypress**, **JavaScript** e **Cucumber (BDD)**, seguindo o padrão **Page Object Model (POM)**.

O objetivo deste projeto é demonstrar boas práticas de automação de testes, organização do framework, reutilização de código e validação de funcionalidades Web e API.

---

# Objetivo

Automatizar os principais fluxos da aplicação Web e um cenário de API utilizando Cypress e Cucumber, implementando boas práticas como:

- BDD (Behavior Driven Development)
- Page Object Model (POM)
- Organização por Features
- Reutilização de código
- Evidências automáticas (Screenshots)
- Separação entre Features, Step Definitions e Page Objects

---

# Tecnologias utilizadas

- Cypress 15.17.0
- JavaScript
- Cucumber (BDD)
- Node.js 22+
- Page Object Model (POM)

---

# Estrutura do projeto



# Pré-requisitos

Antes de executar o projeto é necessário possuir instalado:

- Node.js 22 ou superior
- npm

---

# Instalação

Clone o repositório:

```bash
git clone https://gitlab.com/jaquelinefdeandrade/qa-cypress-cucumber.git
```

Acesse a pasta do projeto:

```bash
cd qa-cypress-cucumber
```

Instale as dependências:

```bash
npm install
```

---

# Executando os testes

## Modo interativo

```bash
npx cypress open
```

## Modo Headless

```bash
npm run cy:run
```

---

# Cenários automatizados

## Login

- Login válido
- Login inválido

## Busca

- Busca de produto existente
- Busca de produto inexistente

## Carrinho

- Adicionar produto ao carrinho
- Validar carrinho vazio

## Checkout

- Validar produto na tela de pagamento
- Validar checkout sem produtos

## API Trello

Foi automatizado um cenário para validação da API:

**GET**

```
https://api.trello.com/1/actions/592f11060f95a3d3d46a987a
```

### Validações realizadas

- Status Code 200
- Campo `list.name`

Também foi implementado um cenário negativo utilizando uma URL inválida.

---

# Site utilizado

https://www.automationexercise.com

---

# API utilizada

https://api.trello.com/1/actions/592f11060f95a3d3d46a987a

---

# Evidências

Durante a execução dos testes são gerados automaticamente screenshots dos cenários Web.

As evidências ficam armazenadas em:

```text
cypress/evidencias/
```

Estrutura das evidências:

```text
evidencias
├── login.feature
├── search.feature
├── add_to_cart.feature
└── checkout.feature
```

---

# Boas práticas utilizadas

- BDD com Cucumber
- Page Object Model (POM)
- Organização por Features
- Step Definitions
- Massa de dados em Fixtures
- Reutilização de código
- Evidências automatizadas
- Separação entre testes Web e API

---

# Resultado

Foram automatizadas:

- 5 Features
- 10 Cenários
- Testes Web
- Teste de API
- Cenários positivos e negativos

Todos os cenários foram executados com sucesso.

---

# Autor

Projeto desenvolvido por **Jaqueline Fernandes de Andrade** como teste técnico de Automação de Testes utilizando Cypress, JavaScript e Cucumber.