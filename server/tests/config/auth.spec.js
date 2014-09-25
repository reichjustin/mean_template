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
        /*
           make a dummy req object that has a logIn method
         */
        var req = {
            logIn: function(err) {
                return err;
            }
        };

        stub.withArgs('local').returns(function()
        {
            return req.logIn(undefined);
        });

        /*
         test an error from password
         */
        var _auth = require('../../config/auth');
        expect(_auth.authenticate(req)).to.equal(undefined);
    });

    it ('should make a POST to login should be have been invalid', function() {
        /*
         make a dummy req object that has a logIn method
         */
        var req = {
            logIn: function(err) {
                return err;
            }
        };

        stub.withArgs('local').returns(function()
        {
            return req.logIn(true);
        });

        /*
         test an error from password
         */
        var _auth = require('../../config/auth');
        expect(_auth.authenticate(req)).to.equal(true);
    });


    it ('should make a POST to logout', function() {
        /*
         make a dummy req object that has a logIn method
         */
        var req = {
            logout: function() {
                return true;
            }
        };

        stub.withArgs('local').returns(function()
        {
            return req.logout();
        });

        /*
         test an error from password
         */
        var _auth = require('../../config/auth');
        expect(_auth.authenticate(req)).to.equal(true);
    });
});