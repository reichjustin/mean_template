var chai=require('chai');
var chaiAsPromised=require('chai-as-promised');
chai.use(chaiAsPromised);
var expect=chai.expect;

describe('main layout page', function() {
    it('should have a container with id main-content', function() {
        //navigate to the index page
        browser.get('http://localhost:3030');

        var mainContent = element.all(by.name('main-content'));

        //there should be 1 main content container
        expect(mainContent.count()).to.eventually.equal(1);
    });
});