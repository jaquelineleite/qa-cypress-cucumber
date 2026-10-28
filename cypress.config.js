const { defineConfig } = require("cypress");
require("dotenv").config();
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");

const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  allowCypressEnv: false,
  trashAssetsBeforeRuns: true,
  e2e: {
    baseUrl: "https://www.automationexercise.com",
    specPattern: "cypress/e2e/features/*.feature",
    supportFile: "cypress/support/e2e.js",
    screenshotsFolder: "cypress/evidencias",

    async setupNodeEvents(on, config) {
      config.env.QA_LOGIN_EMAIL = process.env.QA_LOGIN_EMAIL;
      config.env.QA_LOGIN_PASSWORD = process.env.QA_LOGIN_PASSWORD;
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});
