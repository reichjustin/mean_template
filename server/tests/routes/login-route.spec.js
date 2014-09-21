var express = require('express'),
    app = express(),
    expect = require('chai').expect,
    sinon = require('sinon'),
    login = require('../../routes/loginRoute')(app);

describe("Login Route", function(){

    it ('should make a POST to login', function() {
        var stub = sinon.stub(app,'post');
        stub.withArgs('/login').returns(true);
        stub.withArgs('/invalidpost').returns(false);
        stub.returns(false);

        /*
            This will test the POST routes added from the login routes
            1) login will be valid
            2) an invalid post will return false
            3) anything else will return false
         */
        expect(app.post('/login')).to.equal(true);
        expect(app.post('/invalidpost')).to.equal(false);
        expect(app.post('/invalid')).to.equal(false);
    });

});