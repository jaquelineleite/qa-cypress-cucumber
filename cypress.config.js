const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");

const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
    trashAssetsBeforeRuns: false,
  e2e: {
    baseUrl: "https://www.automationexercise.com",
    specPattern: "cypress/e2e/features/*.feature",
    supportFile: "cypress/support/e2e.js",
    screenshotsFolder: "cypress/evidencias",

    async setupNodeEvents(on, config) {
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
