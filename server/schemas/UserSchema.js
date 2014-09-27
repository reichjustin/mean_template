var mongoose = require('mongoose');

/*
 Create the schema for User
 */
var UserSchema = mongoose.Schema({
    firstname : { type: String, required: true },
    lastname : { type: String, required: true },
    username : { type: String, required: true, unique: true },
    password: String
});


//setup the create user method
UserSchema.methods.createUser = function(req,res,next) {
    this.save(function(err, user) {
        //if there is an error, raise it
        if(err || !user) {res.send({  success: false }); }

        //last step - LOG THE USER IN
        req.logIn(user, function(err) {
        //handle the error if there is on
        if(err) { return next(err); }

            //send it all back!
            res.send({ success: true, user: user });
        });
    });
};


//export the model
module.exports = mongoose.model('User', UserSchema)