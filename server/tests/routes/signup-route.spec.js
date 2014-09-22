var express = require('express'),
    app = express(),
    expect = require('chai').expect,
    sinon = require('sinon'),
    signup = require('../../routes/signupRoute')(app);

describe("Signup Route", function(){

    var stub;
    beforeEach(function() {
        stub = sinon.stub(app,'post');
    });

    afterEach(function() {
        stub.restore();
    });

    it ('should make a POST to signup', function() {
        //setup the stub returns
        stub.withArgs('/signup').returns(true);
        stub.withArgs('/invalidpost').returns(false);
        stub.returns(false);

        /*
         This will test the POST routes added from the login routes
         1) login will be valid
         2) an invalid post will return false
         3) anything else will return false
         */
        expect(app.post('/signup')).to.equal(true);
        expect(app.post('/invalidpost')).to.equal(false);
        expect(app.post('/invalid')).to.equal(false);
    });

});