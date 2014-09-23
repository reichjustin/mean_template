exports.config = {
    specs: [
        'public/tests/e2e/account/**/*.spec.js'
    ],
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        'browserName': 'chrome'
    },
  //  rootElement: '.app',
    allScriptsTimeout: 50000,
    baseUrl: 'http://localhost:3030',
    framework: 'mocha',
    mochaOpts: {
        reporter: "list",
        enableTimeouts: false
    }
}