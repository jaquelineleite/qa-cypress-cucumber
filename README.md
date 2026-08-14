# Framework de Automação de Testes - Cypress + Cucumber

## Descrição

Projeto desenvolvido como teste técnico para automação de testes **Web** e **API**, utilizando **Cypress**, **JavaScript** e **Cucumber (BDD)**, seguindo o padrão **Page Object Model (POM)**.

O objetivo deste projeto é demonstrar boas práticas de automação de testes, organização do framework, reutilização de código, geração de evidências e validação de funcionalidades Web e API.

O projeto contempla os cenários positivos e negativos propostos no desafio técnico, geração de relatórios HTML, evidências de API e estrutura preparada para integração com Jira Xray.

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
- Relatórios HTML
- Organização escalável

---

# Tecnologias utilizadas

- Cypress 15.17.0
- JavaScript
- Node.js 22+
- Cucumber (BDD)
- Page Object Model (POM)
- Multiple Cucumber HTML Reporter
- PowerShell

---

# Integrações

- Automation Exercise
- Trello REST API
- Multiple Cucumber HTML Reporter
- Cucumber JSON Report
- Evidências HTML
- Captura automática da janela do Chrome
- Estrutura preparada para integração com Jira Xray

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
│   ├── reports
│   │   ├── html
│   │   └── json
│   │
│   └── support
│       ├── page_objects
│       ├── commands.js
│       └── e2e.js
│
├── scripts
│   ├── capture-api-evidencias.mjs
│   ├── capture-chrome-window.ps1
│   ├── generate-report.mjs
│   ├── upload-xray.mjs
│   └── templates
│       ├── api-evidence-01.html
│       └── api-evidence-02.html
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

Essa arquitetura proporciona:

- Separação de responsabilidades
- Reutilização de código
- Facilidade de manutenção
- Baixo acoplamento
- Alta legibilidade
- Escalabilidade

---

# Padrão BDD

Os cenários foram escritos utilizando Gherkin através das palavras-chave:

- Feature
- Scenario
- Given
- When
- Then
- And

Essa abordagem aproxima os testes da linguagem de negócio e facilita a comunicação entre QA, Desenvolvimento e Produto.

---

# Pré-requisitos

Antes da execução é necessário possuir instalado:

- Node.js 22 ou superior
- npm

---

# Instalação

Clone o repositório

```bash
git clone https://github.com/jaquelineleite/qa-cypress-cucumber.git
```

Entre na pasta

```bash
cd qa-cypress-cucumber
```

Instale as dependências

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
npm run cy:open
```

## Executar Login

```bash
npx cypress run --spec "cypress/e2e/features/login.feature"
```

## Executar Busca

```bash
npx cypress run --spec "cypress/e2e/features/search.feature"
```

## Executar Carrinho

```bash
npx cypress run --spec "cypress/e2e/features/add_to_cart.feature"
```

## Executar Checkout

```bash
npx cypress run --spec "cypress/e2e/features/checkout.feature"
```

## Executar API

```bash
npx cypress run --spec "cypress/e2e/features/api_trello.feature"
```

---

# Cenários automatizados

## Login

### Positivo

- Realizar login com credenciais válidas.

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

## API

### Positivo

Realizar requisição GET para

```
https://api.trello.com/1/actions/592f11060f95a3d3d46a987a
```

Validando:

- Status Code 200
- Campo list.name

### Negativo

Validar retorno utilizando URL inválida.

---

# Aplicação utilizada

https://www.automationexercise.com

---

# API utilizada

https://api.trello.com/1/actions/592f11060f95a3d3d46a987a

---

# Relatórios e Evidências

## Relatório HTML

Gerar relatório

```bash
npm run report
```

Resultado

```text
cypress/reports/html/index.html
```

---

## Relatório JSON

Gerado automaticamente durante a execução dos testes

```text
cypress/reports/json/cucumber-report.json
```

---

## Evidências de API

Executar

```bash
npm run api:evidence
```

Arquivos gerados

```text
cypress/evidencias/api_trello.feature/api-evidence-01.html

cypress/evidencias/api_trello.feature/api-evidence-02.html
```

---

## Captura da Janela do Chrome

Executar

```powershell
powershell -ExecutionPolicy Bypass -File scripts/capture-chrome-window.ps1
```

Resultado

```text
cypress/evidencias/captura-chrome.png
```

---

# Scripts disponíveis

Executar todos os testes

```bash
npm run cy:run
```

Gerar relatório HTML

```bash
npm run report
```

Gerar evidências da API

```bash
npm run api:evidence
```

Capturar janela do Chrome

```powershell
powershell -ExecutionPolicy Bypass -File scripts/capture-chrome-window.ps1
```

---

# Boas práticas aplicadas

- BDD com Cucumber
- Page Object Model
- Step Definitions
- Page Objects
- Fixtures
- Reutilização de código
- Organização por Features
- Separação Web/API
- Evidências automáticas
- Relatórios HTML
- Relatórios JSON
- Código modularizado
- Estrutura escalável

---

# Cobertura dos testes

O projeto contempla:

- ✅ 5 Features
- ✅ 11 Cenários automatizados
- ✅ Cenários positivos
- ✅ Cenários negativos
- ✅ Automação Web
- ✅ Automação de API REST
- ✅ Relatórios HTML
- ✅ Relatórios JSON
- ✅ Evidências HTML de API
- ✅ Captura automática da janela do Chrome
- ✅ Estrutura preparada para integração com Jira Xray

Resultado da última execução

- 11 testes executados
- 11 testes aprovados
- 0 falhas

---

# Parecer sobre a testabilidade da aplicação

Durante o processo de automação foram observados alguns aspectos que impactam diretamente a testabilidade da aplicação:

- Alguns elementos da interface não possuem identificadores exclusivos (`data-testid`), tornando necessário o uso de seletores por texto e classes CSS.
- O estado do carrinho pode permanecer entre execuções, exigindo limpeza do ambiente antes dos cenários.
- As validações do formulário de pagamento dependem das validações HTML nativas do navegador.
- A API pública utilizada exige validação do conteúdo retornado além do código HTTP.
- A utilização do padrão Page Object Model associada ao BDD facilitou a manutenção, reutilização e organização do framework.

---

# Diferenciais implementados

Além dos requisitos solicitados no desafio técnico, o projeto também contempla:

- Arquitetura baseada em Page Object Model.
- Organização em BDD utilizando Gherkin.
- Relatórios HTML automáticos.
- Relatórios JSON do Cucumber.
- Evidências HTML das chamadas REST.
- Captura automática da janela do navegador.
- Estrutura preparada para integração com Jira Xray.
- Código modularizado visando reutilização e manutenção.

---

# Autor

**Jaqueline Fernandes de Andrade**

Analista de Qualidade de Software | QA Automation

Tecnologias

- Cypress
- JavaScript
- Cucumber
- API Testing
- Page Object Model
- Testes Web
- Testes de API