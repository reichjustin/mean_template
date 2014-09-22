var  chai      = require('chai'),
    chaiPromise = require("chai-as-promised"),
    expect    = chai.expect;

//tie in the chai as promise to the existing chai library
chai.use(chaiPromise);

describe('main layout page', function() {
    beforeEach(function () {
        browser.driver.ignoreSynchronization = true;

        //go to the root page
        browser.get('http://localhost:3030');
    });

    it('should have a container with id main-content', function() {
        expect(element(by.id("main-content")).getText()).to.not.eventually.equal('');
    });
});
