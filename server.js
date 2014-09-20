var express = require('express')

process.env.NODE_ENV =  process.env.NODE_ENV || "development";

var app = express();

var config = {
  rootPath : __dirname,
  port: process.env.PORT || 3030,
  mongo: {
      connString : 'mongodb://sql:sql@ds059519.mongolab.com:59519/mean'
  }
};

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