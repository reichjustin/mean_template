var express = require('express'),
    app = express(),
    config = require('./server/config/config');

/*
   Require the configuratio
   Setup Mongo
   Setup Routes
 */
require('./server/config/express')(app,config);
require('./server/config/mongo')(config);
require('./server/routes/routes')(app);

/*
  Now connect the whole app
 */
app.listen(config.port);
console.log('listening');