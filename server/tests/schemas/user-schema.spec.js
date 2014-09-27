var User = require('../../schemas/UserSchema'),
    expect = require('chai').expect;

describe("UserSchema tests", function(){

    it ('verify user schema creates a model',function() {
        var userObject = User;

        //make sure creating a UserSchema doesnt error out;
        expect(userObject).not.to.equal(undefined);
        expect(userObject.collection.name).to.equal('users');
        expect(userObject.modelName).to.equal('User');
    });
});
