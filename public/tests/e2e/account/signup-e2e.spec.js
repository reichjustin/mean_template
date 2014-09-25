var  chai      = require('chai'),
    chaiPromise = require("chai-as-promised"),
    expect    = chai.expect;

//tie in the chai as promise to the existing chai library
chai.use(chaiPromise);

describe('signup control', function() {

    var emailTextBox, firstNameTextBox,lastNameTextBox, passwordTextBox,
        signupForm, signupButton,  alert;

    beforeEach(function () {
        //setup the http backend
        //$httpBackend = $injector.get('$httpBackend');

        browser.driver.ignoreSynchronization = true;

        //go to the root page
        browser.get('http://localhost:3030');

        //get the elements to test
        signupForm = element(by.id('signupForm'));
        emailTextBox = signupForm.element(by.model('email'));
        firstNameTextBox = signupForm.element(by.model('firstname'));
        lastNameTextBox = signupForm.element(by.model('lastname'));
        passwordTextBox = signupForm.element(by.model('password'));
        signupButton = signupForm.element(by.css('.btn'));
        alert = signupForm.element(by.css('.alert'));
    });


    it ('initialize - check all defaults',function() {

        //the login form should be invalid
        expect(signupForm.getAttribute('class')).to.eventually.contain('ng-invalid');

        //the email textbox should be empty
        expect(emailTextBox.getAttribute('value')).to.eventually.equal('');
        expect(emailTextBox.getAttribute('class')).to.eventually.contain('ng-invalid');

        //the firstname textbox should be empty
        expect(firstNameTextBox.getAttribute('value')).to.eventually.equal('');
        expect(firstNameTextBox.getAttribute('class')).to.eventually.contain('ng-invalid');

        //the last name textbox should be empty
        expect(lastNameTextBox.getAttribute('value')).to.eventually.equal('');
        expect(lastNameTextBox.getAttribute('class')).to.eventually.contain('ng-invalid');

        //the password textbox should be empty
        expect(passwordTextBox.getAttribute('value')).to.eventually.equal('');
        expect(passwordTextBox.getAttribute('class')).to.eventually.contain('ng-invalid');

        //the alert should be hidden
        expect(alert.getAttribute('class')).to.eventually.contain('ng-hide');

        //the login button should be disabled
        expect(signupButton.getAttribute('disabled')).to.not.eventually.equal(null);
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

    it ('first name validation - enter a first name',function() {

        //the password textbox should be invalid
        expect(firstNameTextBox.getAttribute('value')).to.eventually.equal('');
        expect(firstNameTextBox.getAttribute('class')).to.eventually.contain('ng-invalid');

        //set a valid password
        firstNameTextBox.sendKeys("first");

        //the password textbox should now be valid
        expect(firstNameTextBox.getAttribute('value')).to.eventually.equal('first');
        expect(firstNameTextBox.getAttribute('class')).to.eventually.contain('ng-valid');
    });

    it ('last name validation - enter a last name',function() {

        //the password textbox should be invalid
        expect(lastNameTextBox.getAttribute('value')).to.eventually.equal('');
        expect(lastNameTextBox.getAttribute('class')).to.eventually.contain('ng-invalid');

        //set a valid password
        lastNameTextBox.sendKeys("last");

        //the password textbox should now be valid
        expect(lastNameTextBox.getAttribute('value')).to.eventually.equal('last');
        expect(lastNameTextBox.getAttribute('class')).to.eventually.contain('ng-valid');
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

    it ('entering all values will validate form and enable login', function() {
        //the login form should be invalid
        //the login button should be disabled
        expect(signupForm.getAttribute('class')).to.eventually.contain('ng-invalid');
        expect(signupButton.getAttribute('disabled')).to.not.eventually.equal(null);

        //set the textbox to a valid email
        emailTextBox.sendKeys('valid@valid.com');
        firstNameTextBox.sendKeys("first");
        lastNameTextBox.sendKeys("last");
        passwordTextBox.sendKeys('password')

        //the form should now be valid
        expect(signupForm.getAttribute('class')).to.not.eventually.contain('ng-invalid');
        expect(signupForm.getAttribute('class')).to.eventually.contain('ng-valid');

        //the button should no longer be disabled
        expect(signupButton.getAttribute('disabled')).to.eventually.equal(null);
    });

    it ('signup - existing email should show error', function() {
        //set the textbox to a valid email
        emailTextBox.sendKeys('reich.justin@gmail.com');
        firstNameTextBox.sendKeys("first");
        lastNameTextBox.sendKeys("last");
        passwordTextBox.sendKeys('password');


        //after clicking login the invalid email alert should show
        signupButton.click().then(function() {
            expect(alert.getAttribute('class')).to.not.eventually.contain('ng-hide');

            //should still be on the / route
            expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/');
        });
    });

    /*
    it ('signup - valud ', function() {
        //set the textbox to a valid email
        emailTextBox.sendKeys('reich.justin@gmail.com');
        firstNameTextBox.sendKeys("first");
        lastNameTextBox.sendKeys("first");

        //after clicking login the invalid email alert should show
        signupButton.click().then(function() {
            expect(alert.getAttribute('class')).to.not.eventually.contain('ng-hide');
        });
    });

    */
});