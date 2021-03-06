var passport = require('passport')
    User = require('../schemas/UserSchema');

exports.authenticate = function(req, res, next) {

    /*
        Authenticate on the local strat
     */

    var auth = passport.authenticate('local', function(err, user) {
        //if there is an error, raise it
        if(err) { return next(err); }

        //if no user object then this doesnt exist
        if(!user) { res.send({ success: false }); }

        //log it in!
        req.logIn(user, function(err) {
            if(err) { return next(err); }
            res.send({ success: true, user: user });
        });
    })

    //return the auth fn
    return auth(req, res, next);
};

exports.signup = function(req, res, next) {

    //deserialize it to a user schema!
    var newUser = new User(req.body);

    newUser.createUser(req,res,next);
};

exports.logout = function(req,res,next) {
    //logout
    req.logout();

    //send json success
    res.send({ success: true });
};