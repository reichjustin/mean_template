var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../schemas/UserSchema');

module.exports = function() {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({username:username, password: password}).exec(function(err, user) {

                if(user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
        }
    ));

    passport.serializeUser(function(user, done) {
        if(user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({_id:id}).exec(function(err, user) {
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    });
};

