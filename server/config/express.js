var express = require('express'),
    stylus  = require('stylus'),
    logger  = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

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
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session({ secret: 'mean', resave: true,saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware({ src: config.rootPath + '/public', compile: compile }));

//these are public so let it in
    app.use(express.static(config.rootPath + '/public'));
};