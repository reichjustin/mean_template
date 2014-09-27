var mongoose = require('mongoose'),
    crypto = require('crypto'),
    uuid = require('node-uuid');

/*
 Create the schema for User
 */
var UserSchema = mongoose.Schema({
    firstname : { type: String, required: true },
    lastname : { type: String, required: true },
    username : { type: String, required: true, unique: true },
    hashed: { type: String, required: true },
    salt: { type: String, required: true, default: uuid.v1 }
});

var hash = function(pass, salt) {
    return crypto.createHmac('sha256', salt).update(pass).digest('hex');
};

UserSchema.methods.setPassword = function(passwordString) {
    this.hashed = hash(passwordString, this.salt);
};

UserSchema.methods.isValidPassword = function(passwordString) {
    return this.hashed === hash(passwordString, this.salt);
};


//setup the create user method
UserSchema.methods.createUser = function(req,res,next) {

    //the first thing to do: hash the password
    this.setPassword(req.body.password);

    //call save!
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