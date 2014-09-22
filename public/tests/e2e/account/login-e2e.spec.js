var  chai      = require('chai'),
     chaiPromise = require("chai-as-promised"),
     expect    = chai.expect;

//tie in the chai as promise to the existing chai library
chai.use(chaiPromise);

describe('login control', function() {

    var emailTextBox, passwordTextBox,
        loginForm, loginButton,  alert;

    beforeEach(function () {
        //setup the http backend
        //$httpBackend = $injector.get('$httpBackend');

        browser.driver.ignoreSynchronization = true;

        //go to the root page
        browser.get('http://localhost:3030');

        //get the elements to test
        loginForm = element(by.id('loginForm'));
        emailTextBox = loginForm.element(by.model('email'));
        passwordTextBox = loginForm.element(by.model('password'));
        loginButton = loginForm.element(by.css('.btn'));
        alert = loginForm.element(by.css('.alert'));
    });


   it ('initialize - check all defaults',function() {

       //the login form should be invalid
       expect(loginForm.getAttribute('class')).to.eventually.contain('ng-invalid');

       //the email textbox should be empty
       expect(emailTextBox.getAttribute('value')).to.eventually.equal('');
       expect(emailTextBox.getAttribute('class')).to.eventually.contain('ng-invalid');

       //the password textbox should be empty
       expect(passwordTextBox.getAttribute('value')).to.eventually.equal('');
       expect(passwordTextBox.getAttribute('class')).to.eventually.contain('ng-invalid');

       //the alert should be hidden
       expect(alert.getAttribute('class')).to.eventually.contain('ng-hide');

       //the login button should be disabled
       expect(loginButton.getAttribute('disabled')).to.not.eventually.equal(null);
    });

    it ('email validation - enter invalid email',function() {

        //the defauls should be empty
        //invalid
        //invalid required
        //valid email
        expect(emailTextBox.getAttribute('value')).to.eventually.equal('');
        expect(emailTextBox.getAttribute('class')).to.eventually.contain('ng-invalid');
        expect(emailTextBox.getAttribute('class')).to.eventually.contain('ng-invalid-required');
        expect(emailTextBox.getAttribute('class')).to.eventually.contain('ng-valid-email');

        //set the textbox to an invalid email
        emailTextBox.sendKeys('invalid');

        //the textbox should have a value now
        //should be invalid still
        //should pass the required validation
        //should fail the email address validation
        expect(emailTextBox.getAttribute('value')).to.eventually.equal('invalid');
        expect(emailTextBox.getAttribute('class')).to.eventually.contain('ng-invalid');
        expect(emailTextBox.getAttribute('class')).to.not.eventually.contain('ng-invalid-required');
        expect(emailTextBox.getAttribute('class')).to.not.eventually.contain('ng-valid-email');
        expect(emailTextBox.getAttribute('class')).to.eventually.contain('ng-invalid-email');
    });

    it ('email validation - enter valid email',function() {

        //the defauls should be empty
        //invalid
        //invalid required
        //valid email
        expect(emailTextBox.getAttribute('value')).to.eventually.equal('');
        expect(emailTextBox.getAttribute('class')).to.eventually.contain('ng-invalid');
        expect(emailTextBox.getAttribute('class')).to.eventually.contain('ng-invalid-required');
        expect(emailTextBox.getAttribute('class')).to.eventually.contain('ng-valid-email');

        //set the textbox to a valid email
        emailTextBox.sendKeys('valid@valid.com');

        //the textbox should have a value now
        //should be valid
        //should pass the required validation
        //should pass the email address validation
        expect(emailTextBox.getAttribute('value')).to.eventually.equal('valid@valid.com');
        expect(emailTextBox.getAttribute('class')).to.eventually.contain('ng-valid');
        expect(emailTextBox.getAttribute('class')).to.not.eventually.contain('ng-invalid-required');
        expect(emailTextBox.getAttribute('class')).to.eventually.contain('ng-valid-email');
        expect(emailTextBox.getAttribute('class')).to.not.eventually.contain('ng-invalid-email');
    });

    it ('password validation - enter a password',function() {

        //the password textbox should be invalid
        expect(passwordTextBox.getAttribute('value')).to.eventually.equal('');
        expect(passwordTextBox.getAttribute('class')).to.eventually.contain('ng-invalid');

        //set a valid password
        passwordTextBox.sendKeys("password");

        //the password textbox should now be valid
        expect(passwordTextBox.getAttribute('value')).to.eventually.equal('password');
        expect(passwordTextBox.getAttribute('class')).to.eventually.contain('ng-valid');
    });

    it ('entering proper email and password will validate form and enable login', function() {
        //the login form should be invalid
        //the login button should be disabled
        expect(loginForm.getAttribute('class')).to.eventually.contain('ng-invalid');
        expect(loginButton.getAttribute('disabled')).to.not.eventually.equal(null);

        //set the textbox to a valid email
        emailTextBox.sendKeys('valid@valid.com');
        passwordTextBox.sendKeys("password");

        //the form should now be valid
        expect(loginForm.getAttribute('class')).to.not.eventually.contain('ng-invalid');
        expect(loginForm.getAttribute('class')).to.eventually.contain('ng-valid');

        //the button should no longer be disabled
        expect(loginButton.getAttribute('disabled')).to.eventually.equal(null);
    });

    it ('login - invalid login should show error', function() {
        //set the textbox to a valid email
        emailTextBox.sendKeys('valid@valid.com');
        passwordTextBox.sendKeys("password");

        //after clicking login the invalid email alert should show
        loginButton.click().then(function() {
            expect(alert.getAttribute('class')).to.not.eventually.contain('ng-hide');
        });
    });

    it ('login - valid login hide form', function() {
        //the form should be visible first
        expect(loginForm.getAttribute('class')).to.not.eventually.contain('ng-hide');

        //set the textbox to a valid email
        emailTextBox.sendKeys('reich.justin@gmail.com');
        passwordTextBox.sendKeys("password");

        //after clicking login the valid login should hide the form
        loginButton.click().then(function() {
            expect(loginForm.getAttribute('class')).to.eventually.contain('ng-hide');
        });
    });
});