var fs = require("fs");

module.exports = function(app,config) {

    /*
        Partial view routes
        Handles any request for a jade partial and returns proper one
     */
    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0])
    });


    /*
     All specific routes
     */
    fs.readdirSync(config.rootPath + 'server/routes').forEach(function(file) {
        require(config.rootPath + 'server/routes/' + file)(app);
    });

    /*
        Any unhandled route goes to the index page
     */
    app.get('*', function (req, res) {
        res.render('index');
    });
}