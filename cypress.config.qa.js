const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "pqvtys",
    defaultBrowser: "chrome",
    viewportHeight: 1024,
    viewportWidth: 1440,
    retries: {
        runMode: 2,
        openMode: 0,
    },
    defaultCommandTimeout: 7000,
    env: {
        BASIC_AUTH_USERNAME: "guest1",
        BASIC_AUTH_PASSWORD: "welcome2qauto",
    },
    e2e: {
      baseUrl: "https://qauto.forstudy.space",
      watchForFileChanges: false,
      specPattern: "cypress/e2e/**/*.{spec,test}.{js,jsx,ts,tsx}",
      experimentalRunAllSpecs: true,
      setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    },
});
