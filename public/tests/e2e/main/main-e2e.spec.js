var chai = require('chai'),
    chaiAsPromised=require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('main layout page', function() {
    it('should have a container with id main-content', function() {
        //navigate to the index page
        browser.get('http://localhost:3030');

        //get the main content element
        var elm = $$("#main-content");

        //it should have 1
        expect(elm.count()).to.eventually.equal(1);
    });
});