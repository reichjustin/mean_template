var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    config = require('./server/config/config');

/*
   Require the configuration
   Setup Mongoose
   Setup Routes
 */
require('./server/config/express')(app,config);
require('./server/config/mongo')(config);

var User = mongoose.model('User');
passport.use(new LocalStrategy(function(username,password,done) {
    User.findOne().exec(function(err,u) {
        if (u) {
           return done(null,u);
        } else {
           return done(null,false);
        }
    });
}));

passport.serializeUser(function(u,done) {
    if (u) {
        done(null, u._id);
    }
});

passport.deserializeUser(function(id,done) {
    User.findOne({ _id : id}).exec(function( err, user) {
        if (user) {
           return done(null,user);
        } else {
            return done(null,false);
        }
    })
});

require('./server/routes/routes')(app);

/*
  Now connect the whole app
 */
app.listen(config.port);
console.log('listening');