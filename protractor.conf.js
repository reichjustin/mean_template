exports.config = {
    seleniumAddress: 'http://localhost:4723/wd/hub',
    specs: [
        'public/tests/e2e/**/*.js'
    ],

    chromeOnly: true,
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['show-fps-counter=true']
        }
    },
    baseUrl: '',


    framework: 'mocha',
    mochaOpts: {
        reporter: "spec",
        enableTimeouts: false
    }
}