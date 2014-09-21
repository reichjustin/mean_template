var UserSchema = require('../../schemas/UserSchema'),
    expect = require('chai').expect;

describe("UserSchema tests", function(){

    it ('verify user schema creates a model',function() {
        var userObject = UserSchema.User;

        //make sure creating a UserSchema doesnt error out;
        expect(userObject).not.to.equal(undefined);
        expect(userObject.schemaModel).not.to.equal(undefined);
        expect(userObject.schemaModel.collection.name).to.equal('users');
        expect(userObject.schemaModel.modelName).to.equal('User');
    });
});
