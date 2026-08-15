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
- Validar que o usuário autenticado é apresentado na aplicação.

### Negativo
- Realizar tentativa de login com credenciais inválidas.
- Validar a apresentação da mensagem de erro de autenticação.

---

## Busca

### Positivo
- Pesquisar por um produto existente.
- Validar a existência de resultados.
- Validar que o produto retornado corresponde ao termo pesquisado.

### Negativo
- Pesquisar por um produto inexistente.
- Validar que nenhum produto é retornado.

---

## Carrinho

### Positivo
- Adicionar o primeiro produto disponível ao carrinho.
- Validar a persistência do nome e preço.
- Validar a quantidade igual a 1.
- Validar o total do produto no carrinho.

### Negativo
- Acessar o carrinho sem produtos.
- Validar a mensagem de carrinho vazio.
- Validar que não existem produtos e que o checkout não é apresentado.

---

## Checkout

### Positivo
- Realizar o fluxo completo de checkout com usuário autenticado.
- Validar os dados do produto no resumo do pedido.
- Preencher os dados obrigatórios de pagamento.
- Confirmar o pedido com sucesso.

### Negativo
- Tentar confirmar o pagamento sem preencher os campos obrigatórios.
- Validar que o pedido não é finalizado.
- Validar a permanência na tela de pagamento.
- Validar os campos obrigatórios do formulário.

---

## API

### GET Trello - Fluxo positivo
- Status Code 200.
- Validação da estrutura `data.list.name`.
- Validação de que `list.name` é uma string não vazia.
- Exibição do valor retornado no log.

### GET Trello - Fluxo negativo
- Requisição utilizando uma ação inexistente.
- Validação do Status Code 400.

### POST Automation Exercise
- POST para `/api/createAccount`.
- Requisição propositalmente sem o parâmetro `email`.
- Validação do Status HTTP 200.
- Validação do `responseCode` 400.
- Validação da mensagem referente ao parâmetro `email` ausente.

---

# Aplicação e APIs utilizadas

- Web: `https://www.automationexercise.com`
- Trello: `https://api.trello.com/1/actions/592f11060f95a3d3d46a987a`
- Automation Exercise API: `https://automationexercise.com/api/createAccount`

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

# Matriz Final de Entregas

A tabela abaixo apresenta o status dos requisitos definidos no desafio técnico.

| Requisito | Status | Evidência / Observação |
|---|---|---|
| Cypress em versão recente | ✅ Atendido | Cypress 15.17.0 |
| JavaScript | ✅ Atendido | Automação implementada em JavaScript |
| Cucumber / Gherkin | ✅ Atendido | 5 arquivos `.feature` utilizando BDD declarativo |
| Page Object Model | ✅ Atendido | Page Objects centralizam seletores, ações e validações |
| Estrutura de diretórios solicitada | ✅ Atendido | Features, Step Definitions, Page Objects, Fixtures, Scripts e Templates organizados |
| Login positivo e negativo | ✅ Atendido | Credenciais válidas e inválidas |
| Busca positiva e negativa | ✅ Atendido | Produto existente e inexistente |
| Adição de produto ao carrinho | ✅ Atendido | Fluxo automatizado a partir da listagem |
| Persistência de nome no carrinho | ✅ Atendido | Comparação entre produto selecionado e carrinho |
| Persistência de preço no carrinho | ✅ Atendido | Comparação entre listagem e carrinho |
| Validação de quantidade | ✅ Atendido | Quantidade esperada igual a 1 |
| Checkout completo | ✅ Atendido | Fluxo até confirmação do pedido |
| Campos obrigatórios do pagamento | ✅ Atendido | Finalização bloqueada com campos vazios |
| GET Trello | ✅ Atendido | Endpoint obrigatório implementado |
| Status Code do GET Trello | ✅ Atendido | Validação rígida de HTTP 200 |
| Campo `data.list.name` | ✅ Atendido | Existência, tipo, conteúdo e log validados |
| GET Trello negativo | ✅ Atendido | Ação inexistente com HTTP 400 |
| POST `/api/createAccount` | ✅ Atendido | Automation Exercise API |
| Regra de parâmetro obrigatório | ✅ Atendido | `email` omitido propositalmente |
| Validação de regra no JSON | ✅ Atendido | `responseCode` 400 e mensagem referente ao `email` |
| Massa de dados em Fixture | ✅ Atendido | Dados centralizados em `cypress/fixtures/users.json` |
| Custom Commands | ✅ Atendido | Command reutilizável `cy.login()` integrado ao Page Object |
| Evidências Web | ✅ Atendido | Screenshots organizados por Feature |
| Templates de evidência API | ✅ Atendido | `api-evidence-01.html` e `api-evidence-02.html` |
| Geração automática de evidências API | ✅ Atendido | `npm run api:evidence` executado com sucesso |
| Relatório Cucumber JSON | ✅ Atendido | Gerado durante a execução |
| Relatório Cucumber HTML | ✅ Atendido | `npm run report` executado com sucesso |
| Execução completa sem falhas | ✅ Atendido | 11 testes executados, 11 aprovados e 0 falhas |
| Execução em ambiente Linux | ✅ Atendido | Suíte validada em GitHub Codespaces |
| Script de integração Jira Xray | ⚠️ Parcialmente atendido | Implementação concluída; upload real depende de credenciais Xray |
| Captura da janela do Chrome via PowerShell | ⚠️ Parcialmente atendido | Script preparado para Windows; versão atual não executada no Codespaces Linux |

## Resultado geral

- ✅ Requisitos principais de automação Web atendidos.
- ✅ Requisitos principais de automação API atendidos.
- ✅ BDD, POM, Fixtures e reutilização implementados.
- ✅ Relatórios e evidências automatizados.
- ✅ Execução completa: **11 cenários aprovados e 0 falhas**.
- ⚠️ Integração real com Xray depende de credenciais externas.
- ⚠️ O script PowerShell de captura do Chrome deve ser executado em ambiente Windows.
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
