var express = require('express'),
    app = express(),
    config = require('./server/config/config');

/*
   Require the configuration
   Setup Mongoose
   Setup Routes
 */
require('./server/config/express')(app,config);
require('./server/config/mongo')(config);
require('./server/config/passport');
require('./server/config/routes')(app,config);

/*
  Now connect the whole app
 */
app.listen(config.port);
console.log('listening');