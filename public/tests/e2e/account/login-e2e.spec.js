var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('login control', function() {
    /*
        This is an e2e integration test for a valid login
     */
    it('test valid email', function() {
        //navigate to the index page
        browser.get('http://localhost:3030');

        //get the main content element
        var hiddenLoginControls = $$(".navbar-form.ng-hide");

        //initially the controls should be visible so this will be 0
        expect(hiddenLoginControls.count()).to.eventually.equal(0);

        //set the login and password
        element(by.model("password")).sendKeys("abc");
        element(by.model("email")).sendKeys("reich.justin@gmail.com");

        //click the signin!
        element(by.css('[ng-click="signin()"]') ).click();

        //it should now be hidden!
        expect(hiddenLoginControls.count()).to.eventually.equal(1);
    });

    /*
        This is an e2e integration test for an invalid login
     */
    it('test invalid email', function() {
        //navigate to the index page
        browser.get('http://localhost:3030');

        //get the main content element
        var hiddenLoginControls = $$(".navbar-form.ng-hide");

        //initially the controls should be visible so this will be 0
        expect(hiddenLoginControls.count()).to.eventually.equal(0);

        //set the login and password
        element(by.model("password")).sendKeys("abc");
        element(by.model("email")).sendKeys("invalid@gmail.com");

        //click the signin!
        element(by.css('[ng-click="signin()"]') ).click();

        //it should still not be hidden!
        expect(hiddenLoginControls.count()).to.eventually.equal(0);
    });
});