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
exports.User = new BaseSchema.BaseSchema("User", UserSchema);

