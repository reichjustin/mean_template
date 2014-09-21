var BaseSchema = require('../../schemas/BaseSchema'),
    mongoose = require('mongoose'),
    expect = require('chai').expect;

describe("BaseSchema tests", function(){

    it ('verify base schema creates a model',function() {

        /*
        Setup a dummy test schema
         */
        var testSchema = mongoose.Schema({
           name: String
        });

        //call the base schema create
        var schema = new BaseSchema.CreateBaseSchema("Test",testSchema);

        //create a mongoose model off the test schema
        var testModel = mongoose.model("Test", testSchema);

        //make sure the base schema sets everything correctly!
        expect(schema.schemaModel).to.equal(testModel);
    });
});
