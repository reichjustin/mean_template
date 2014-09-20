var mongoose = require('mongoose');

module.exports = function(config) {
    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error'));

    db.once('open', function callback() {
        console.log('mongo open');
    });

    var userSchema = mongoose.Schema({
       firstName : String,
       lastName : String,
       userName : String
    });

    var User = mongoose.model('User',userSchema);
}