// Start with a webdriver instance:
var webdriver = require('selenium-webdriver'),
    chai      = require('chai'),
    expect    = chai.expect,
    chaiWebdriver = require('chai-webdriver');

// And you're good to go!
var driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    build();
chai.use(chaiWebdriver(driver));

describe('main layout page', function() {

    beforeEach(function () {
        driver.get('http://localhost:3030');
    });

    afterEach(function () {
        driver.quit();
    });

    it('should have a container with id main-content', function() {
        driver.wait(function() {
            //it should have 1
            element(by.id("lgEmail")).sendKeys("A");
        }, 200);
    });
});
