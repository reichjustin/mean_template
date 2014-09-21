var mongoose = require('mongoose');

/*
   The base template for a schema
   it will take in the name of the model and the scehma to create
   the nset to a local variable
 */
exports.CreateBaseSchema = function(schemaName, schema) {
    this.schemaModel = mongoose.model(schemaName,schema);
};
