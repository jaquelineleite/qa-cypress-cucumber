# QA Automation Framework | Cypress + Cucumber

[![Cypress Tests](https://github.com/jaquelineleite/qa-cypress-cucumber/actions/workflows/cypress-tests.yml/badge.svg)](https://github.com/jaquelineleite/qa-cypress-cucumber/actions/workflows/cypress-tests.yml)

Framework de automação de testes Web e API desenvolvido com Cypress, JavaScript e Cucumber (BDD), utilizando Page Object Model (POM), integração contínua e geração de evidências.

## Tecnologias

- Cypress 15.17.0
- JavaScript e Node.js 22
- Cucumber / Gherkin
- Page Object Model (POM)
- GitHub Actions
- Multiple Cucumber HTML Reporter

## Cobertura automatizada

| Área | Validações |
| --- | --- |
| Login | Autenticação positiva e negativa |
| Busca | Produtos existentes e inexistentes |
| Carrinho | Inclusão, dados do produto e carrinho vazio |
| Checkout | Resumo do pedido, confirmação e campos obrigatórios |
| API Trello | Respostas positivas e negativas |
| API Automation Exercise | Regras de resposta e parâmetros obrigatórios |
| Diagnósticos | Disponibilidade, integração de login e respostas de API |

A suíte possui 9 arquivos de especificação: 6 arquivos BDD e 3 arquivos de diagnóstico.

**Última execução validada: 25 testes aprovados, 0 falhas.**

## Arquitetura

O framework organiza suas responsabilidades em:

- **Features:** cenários descritos em Gherkin.
- **Step Definitions:** implementação dos passos BDD.
- **Page Objects:** interações, seletores e validações reutilizáveis.
- **Fixtures:** dados de teste.
- **Scripts:** relatórios, evidências e integração opcional com Xray.

O fluxo de compra utiliza Page Objects separados para produtos, carrinho, checkout e pagamento.

## Instalação

Requisitos: Node.js 22 ou superior e npm.

```bash
git clone https://github.com/jaquelineleite/qa-cypress-cucumber.git
cd qa-cypress-cucumber
npm ci
```

## Execução dos testes

```bash
npm run cy:open
npm run cy:run
npm test
```

Para gerar relatórios e evidências:

```bash
npm run report
npm run api:evidence
```

## Integração contínua

O GitHub Actions executa a suíte em Ubuntu 24.04 com Node.js 22.

O workflow contempla:

- Push e Pull Requests para main e consolidacao-qa-automation.
- Execução manual.
- Credenciais configuradas via GitHub Secrets.
- Geração de relatório HTML.
- Publicação de relatórios e evidências por 14 dias.

## Relatórios e evidências

- HTML: `cypress/reports/html/index.html`
- JSON: `cypress/reports/json/cucumber-report.json`
- Evidências: `cypress/evidencias/`

Os artefatos de execução não precisam ser versionados.

## Configuração e segurança

Utilize `.env.example` como referência para configurar:

- `QA_LOGIN_EMAIL`
- `QA_LOGIN_PASSWORD`

Não versione credenciais ou arquivos `.env`.

No GitHub Actions, configure as credenciais em Repository Secrets.

## Limitações conhecidas

- Alguns seletores dependem da estrutura HTML da aplicação pública.
- A validação dos campos obrigatórios de pagamento utiliza recursos nativos do navegador.
- A integração real com Jira Xray depende de credenciais externas.
- A disponibilidade das aplicações e APIs públicas pode afetar as execuções.

## Autora

**Jaqueline Fernandes de Andrade**

QA Automation | Quality Engineering

Projeto de portfólio voltado à demonstração de automação Web e API, arquitetura de testes, BDD, CI/CD e práticas de qualidade de software.
