var express = require('express'),
    app = express(),
    config = require('../../config/config'),
    expect = require('chai').expect;

describe('express config file tests',function() {

    it ('verify the express stuff',function() {
        var _express = require('../../config/express')(app,config);

        /* verify the app properties are handled */

        //express will be undefined because it doesnt return anything
        //it just sets up the app
        expect(_express).to.equal(undefined);
        expect(app.settings.env).to.equal('development');
        expect(app.settings.views).to.equal(config.rootPath + '/server/views');
    });
});