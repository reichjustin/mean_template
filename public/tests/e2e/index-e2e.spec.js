var  chai      = require('chai'),
    chaiPromise = require("chai-as-promised"),
    expect    = chai.expect;

//tie in the chai as promise to the existing chai library
chai.use(chaiPromise);

describe('index/home page', function() {
    var footer, navbar, logoutButton;

    beforeEach(function () {
        browser.driver.ignoreSynchronization = true;

        //go to the root page
        browser.get('http://localhost:3030');

        footer = element(by.css(".footer"));
        navbar = element(by.css(".navbar"));
        logoutButton = navbar.element(by.css('.btn'));
    });

    it ('footer should have text', function() {
        expect(footer.getText()).to.eventually.equals('squirrel');
    });

    it ('navbar should have text', function() {
        expect(navbar.getText()).to.eventually.equals('MEAN Template');
    });

    it ('logout button should be hidden by default', function() {
        expect(logoutButton.getAttribute('class')).to.eventually.contain('ng-hide');
    });

    it ('logging in should show the logout button', function() {
        //setup all the login stuff needed
        var loginForm = element(by.id('loginForm'));
        var emailTextBox = loginForm.element(by.model('email'));
        var passwordTextBox = loginForm.element(by.model('password'));
        var loginButton = loginForm.element(by.css('.btn'));


        //set the textbox to a valid email
        emailTextBox.sendKeys('reich.justin@gmail.com');
        passwordTextBox.sendKeys("password");

        //after clicking login the logout button should be visible
        loginButton.click().then(function() {
            expect(logoutButton.getAttribute('class')).to.not.eventually.contain('ng-hide');
            //should redirect to the /home route
            expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/home');
        });
    });

    it ('logging in should show the logout button and logging out should go back to /', function() {
        //setup all the login stuff needed
        var loginForm = element(by.id('loginForm'));
        var emailTextBox = loginForm.element(by.model('email'));
        var passwordTextBox = loginForm.element(by.model('password'));
        var loginButton = loginForm.element(by.css('.btn'));


        //set the textbox to a valid email
        emailTextBox.sendKeys('reich.justin@gmail.com');
        passwordTextBox.sendKeys("password");

        //after clicking login the logout button should be visible
        loginButton.click().then(function() {
            expect(logoutButton.getAttribute('class')).to.not.eventually.contain('ng-hide');
            //should redirect to the /home route
            expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/home');

            logoutButton.click().then(function() {

                //should redirect to the /home route
                expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/');
            })
        });
    });
});
