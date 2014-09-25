
var auth = require('./../config/auth')


module.exports = function(app) {
    app.post('/logout', auth.logout);
}
