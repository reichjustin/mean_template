exports.config = {
    seleniumAddress: 'http://localhost:4723/wd/hub',
    specs: [
        'public/tests/e2e/**/*.spec.js'
    ],

    chromeOnly: true,

    baseUrl: '',

    capabilities: {
        'browserName': 'phantomjs',

        /*
         * Can be used to specify the phantomjs binary path.
         * This can generally be ommitted if you installed phantomjs globally.
         */
        'phantomjs.binary.path': 'node_modules/phantomjs/bin/phantomjs',

        /*
         * Command line arugments to pass to phantomjs.
         * Can be ommitted if no arguments need to be passed.
         * Acceptable cli arugments: https://github.com/ariya/phantomjs/wiki/API-Reference#wiki-command-line-options
         */
        'phantomjs.cli.args': ['--logfile=PATH', '--loglevel=DEBUG']
    },

    framework: 'mocha',
    mochaOpts: {
        reporter: "list",
        enableTimeouts: false
    }
}