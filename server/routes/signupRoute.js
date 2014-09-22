
var auth = require('./../config/auth')


module.exports = function(app) {
    app.post('/signup', auth.signup);
}
