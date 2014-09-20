var express = require('express'),
    stylus  = require('stylus'),
    logger  = require('morgan'),
    bodyParser = require('body-parser');

module.exports = function(app,config) {

    /*
     Stylus middleware
     */
    function compile(str, path) {
        return stylus(str).set('filename', path);
    };

    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(bodyParser());

    app.use(stylus.middleware({ src: config.rootPath + '/public', compile: compile }));

//these are public so let it in
    app.use(express.static(config.rootPath + '/public'));
};