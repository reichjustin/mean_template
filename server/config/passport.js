var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var User = mongoose.model('User');

module.exports = function () {
    passport.use(new LocalStrategy(function (username, password, done) {
        User.findOne().exec(function (err, u) {
            if (u) {
                return done(null, u);
            } else {
                return done(null, false);
            }
        });
    }));

    passport.serializeUser(function (u, done) {
        if (u) {
            done(null, u._id);
        }
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({ _id: id}).exec(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    });
}