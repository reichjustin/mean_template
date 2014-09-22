var mongoose = require('mongoose'),
    BaseSchema = require('./BaseSchema');

/*
  Create the schema for User
 */
var UserSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    userName : String
});

//setup the User object to inherit from the BaseSchema
exports.User = new BaseSchema.CreateBaseSchema("User", UserSchema);

exports.createUser = function(req,res,next) {

    //get a reference to the user schema
    var _user = this.User.schemaModel;

    /*
        1) attempt to find by user name
        2) if no users exist, create!
        3) finally is everything goes well, auth that user before sending it all back
     */
    _user.findOne({userName: req.query.username}).exec(function(err, user) {
        //if there is an error, raise it
        if(err) { return next(err); }

        //if there is a user with that username then return failure
        if(user) {
            //since there is a user already with this username return a success of false
            res.send({ success: false });
        } else {
            //make the promise call to create the new user
            _user.create({ userName: req.query.username, firstName: req.query.firstname, lastName: req.query.lastname}, function(err, user) {
                //if there is an error, raise it
                if(err) { return next(err); }

                //if no user object was returned something happened
                if (!user) { return { success: false } };

                //last step - LOG THE USER IN
                req.logIn(user, function(err) {
                    //handle the error if there is on
                    if(err) { return next(err); }

                    //send it all back!
                    res.send({ success: true, user: user });
                });
            });
        }
    })

};

