var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
        db: 'mongodb://sql:sql@ds059519.mongolab.com:59519/mean',
        rootPath: rootPath,
        port: process.env.PORT || 3030
}