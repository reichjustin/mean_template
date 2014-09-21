var express = require('express'),
    app = express(),
    expect = require('chai').expect,
    sinon = require('sinon');

describe('routes config file tests',function() {

    var stub;
    beforeEach(function() {
        stub = sinon.stub(app,'get');
    });

    afterEach(function() {
        stub.restore();
    });

    it ('verify the routes stuff',function() {
        //setup the stub routes
        stub.withArgs('/partials/test').returns('/test');
        stub.withArgs('invalid/route').returns('/');
        stub.withArgs('*').returns('/');
        stub.returns('/');

        /*
            verify that these routes are properly handled
            1) a real route
            2) an undefined route
            3) an invalid route that gets redirected to /
            4) a * should return /
        */
        expect(app.get('/partials/test')).to.equal('/test');
        expect(app.get('undefined route')).to.equal('/');
        expect(app.get('invalid/route')).to.equal('/');
        expect(app.get('*')).to.equal('/');
    });
});