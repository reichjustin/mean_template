describe('Unit: AuthFactory', function() {
    var $httpBackend,
        authFactory,
        userFactory;

    beforeEach(module('app'));

    beforeEach(inject(function ($injector) {

        $httpBackend = $injector.get('$httpBackend');
        authFactory = $injector.get('AuthFactory');
        userFactory = $injector.get('UserFactory');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should verify a user is properly authenticaed", function () {

        /*
            setup the dummy user we will test
         */
        var user = {
            username: "test@test.com",
            password: "password"
        };

        /*
            On the login, catch it and return some good data!
         */
        $httpBackend.expectPOST('/login', user)
            .respond(function() {
              return [201,{ "success": true, user: user }];
            });

        //before the call it shouldnt be authenticated
        expect(userFactory.currentUser).to.equal(undefined);
        expect(userFactory.isAuthenticated()).to.equal(false);

        //calling authenticateUser should return a deferred promise value of true
        authFactory.authenticateUser(user.username,user.password).then(function(data) {
            //make sure we got a true result
            expect(data).to.equal(true);

            //now that its called it should be authenticated
            expect(userFactory.currentUser).not.to.equal(undefined);
            expect(userFactory.isAuthenticated()).to.equal(true);
        });


        //flush out the remaining requests
        $httpBackend.flush();
    });

    it("should verify a user is properly denied", function () {

        /*
         setup the dummy user we will test
         */
        var user = {
            username: "test@test.com",
            password: "password"
        };

        /*
         On the login, catch it and return some bad data!
         */
        $httpBackend.expectPOST('/login', user)
            .respond(function() {
                return [201,{ "success": false, user: user }];
            });

        //before the call it shouldnt be authenticated
        expect(userFactory.currentUser).to.equal(undefined);
        expect(userFactory.isAuthenticated()).to.equal(false);

        //calling authenticateUser should return a deferred promise value of false
        authFactory.authenticateUser(user.username,user.password).then(function(data) {
            expect(data).to.equal(false);

            //should still be unauthenticated
            expect(userFactory.currentUser).to.equal(undefined);
            expect(userFactory.isAuthenticated()).to.equal(false);
        });


        //flush out the remaining requests
        $httpBackend.flush();
    });

});