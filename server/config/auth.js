var passport = require('passport');

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
        })
    })

    //return the auth fn
    auth(req, res, next);
};