
var auth = require('./../config/auth')


module.exports = function(app) {
    app.post('/login', auth.authenticate);
}
