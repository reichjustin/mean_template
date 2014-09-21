var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    userName : String
});

mongoose.model('User',userSchema);

exports.getSchemaAsModel = function() {
    return mongoose.model('User');
}