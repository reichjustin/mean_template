var  chai      = require('chai'),
     chaiPromise = require("chai-as-promised"),
     expect    = chai.expect;

//tie in the chai as promise to the existing chai library
chai.use(chaiPromise);

describe('login control', function() {
    var emailTextBox, passwordTextBox,
        loginForm, loginButton,  alert;

    beforeEach(function () {
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
       expect(loginButton.getAttribute('disabled')).to.not.eventually.equal(undefined);
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

        //set the textbox to an invalid email
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
});