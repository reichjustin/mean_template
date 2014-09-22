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

describe('login control', function() {

    beforeEach(function () {


    });

    afterEach(function () {
        driver.quit();
    });

   it ('initialize - check all defaults',function() {
       driver.get('http://localhost:3030');
       driver.wait(function() {
           return false;
       }, 2000);



        //the login button should be disabled
        expect(element("#loginForm button")).dom.to.be.disabled();



        //the invalid login alert should not be visible
//        expect("#loginForm .alert").dom.not.to.be.visible();

        //the email textbox should be invalid
  //      expect("#lgEmail").dom.to.have.htmlClass('ng-invalid');

        //the password textbox should be invalid
    //    expect("#lgPassword").dom.to.have.htmlClass('ng-invalid');

        //the form should be invalid
      //  expect("#loginForm").dom.to.have.htmlClass('ng-invalid');
    });

    //it ('email validation - enter invalid email',function() {

        //the login button should be disabled
      //  expect("#loginForm button").dom.to.be.disabled();

        //the email textbox should be invalid
      //  expect("#lgEmail").dom.to.have.htmlClass('ng-invalid');
       // expect("#lgEmail").dom.to.have.htmlClass('ng-invalid-required');
       // expect("#lgEmail").dom.to.have.htmlClass('ng-valid-email');

        //the form should be invalid
        //expect("#loginForm").dom.to.have.htmlClass('ng-invalid');

           // element(by.id('lgEmail')).sendKeys("aa")

      // element(by.id('lgEmail')).sendKeys("aa")


        //set the email to an invalid email address\
       // element(by.id("lgEmail")).sendKeys("invalid@gmail.com");
        //the form should be invalid
       // expect("#lgEmail").dom.to.have.htmlClass('ng-invalid');
       // expect("#lgEmail").dom.not.to.have.htmlClass('ng-invalid-required');
        //expect("#lgEmail").dom.not.to.have.htmlClass('ng-valid-email');

        //the form should still be invalid
        //expect("#loginForm").dom.to.have.htmlClass('ng-invalid');

        //the login button should still be disabled
      //  expect("#loginForm button").dom.to.be.disabled();
   // });
/*
    it ('email validation - enter valid email',function() {

        //the email textbox should be invalid
        expect("#lgEmail").dom.to.have.htmlClass('ng-invalid');
        expect("#lgEmail").dom.to.have.htmlClass('ng-invalid-required');
        expect("#lgEmail").dom.to.have.htmlClass('ng-valid-email');

        //set a valid email

        //reverse test
        expect("#lgEmail").dom.not.to.have.htmlClass('ng-invalid');
        expect("#lgEmail").dom.not.to.have.htmlClass('ng-invalid-required');
        expect("#lgEmail").dom.to.have.htmlClass('ng-valid-email');
    });

    it ('password validation - enter a password',function() {

        //the password textbox should be invalid
        expect("#lgPassword").dom.to.have.htmlClass('ng-invalid');
        expect("#lgPassword").dom.to.have.htmlClass('ng-invalid-required');

        //set a valid password

        //reverse test
        expect("#lgPassword").dom.not.to.have.htmlClass('ng-invalid');
        expect("#lgPassword").dom.not.to.have.htmlClass('ng-invalid-required');
    });*/
});