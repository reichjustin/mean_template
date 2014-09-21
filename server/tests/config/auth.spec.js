var chai = require('chai'),
    expect = require('chai').expect,
    sinon = require('sinon'),
    passport = require('passport');
    chai.use(require('chai-as-promised'));

describe("Auth Config",  function(){

    var stub;
    beforeEach(function() {
        stub = sinon.stub(passport,'authenticate');
    });

    afterEach(function() {
        stub.restore();
    });

    it ('should make a POST to login with error from passport', function() {
        stub.withArgs('local').returns(function()
        {
            return { err: true, user: undefined };
        });


        /*
            test an error from password
         */
        var _auth = require('../../config/auth');
        expect(_auth.authenticate().err).to.equal(true);
    });

    it ('should make a POST to login with an invalid user from passport', function() {
        stub.withArgs('local').returns(function()
        {
            return { err: undefined, user: undefined };
        });


        /*
         test an error from password
         */
        var _auth = require('../../config/auth');
        expect(_auth.authenticate().user).to.equal(undefined);
    });

    it ('should make a POST to login should be valid', function() {
        stub.withArgs('local').returns(function()
        {
            return { err: undefined, user: true };
        });

        /*
         test an error from password
         */
        var _auth = require('../../config/auth');
        expect(_auth.authenticate().user).to.equal(true);
    });
});