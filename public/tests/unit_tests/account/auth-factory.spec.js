describe('Unit: AuthFactory', function() {
    var $httpBackend,
        authFactory,
        $location;

    beforeEach(module('app'));

    beforeEach(inject(function ($injector) {

        $httpBackend = $injector.get('$httpBackend');
        authFactory = $injector.get('AuthFactory');
        $location = $injector.get('$location');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    /* make sure this factory exists to begin with */
    it('make sure user factory exists',function () {
        expect(authFactory).not.to.equal(null);
    });

    /* There should not be an authenicated user on init */
    it('make sure user factory is not authenticated yet',function () {
        expect(authFactory.currentUser).to.equal(undefined);
        expect(authFactory.isAuthenticated()).to.equal(false);
    });

    /* setting the current user should return a true auth */
    it('setting the currentUser will result in auth',function () {
        authFactory.currentUser = { username : 'test' };
        expect(authFactory.isAuthenticated()).to.equal(true);
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
        expect(authFactory.currentUser).to.equal(undefined);
        expect(authFactory.isAuthenticated()).to.equal(false);

        authFactory.authenticateUser(user.username,user.password).then(function(data) {
            expect(data).to.equal(true);

            //should still be unauthenticated
            expect(authFactory.currentUser).not.to.equal(undefined);
            expect(authFactory.isAuthenticated()).to.equal(true);
            expect($location.url()).to.equal('/home');
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
                return [201,{  "success": false, user: user  }];
            });

        //before the call it shouldnt be authenticated
        expect(authFactory.currentUser).to.equal(undefined);
        expect(authFactory.isAuthenticated()).to.equal(false);

        authFactory.authenticateUser(user.username,user.password).then(function(data) {
            expect(data).to.equal(false);

            //should still be unauthenticated
            expect(authFactory.currentUser).to.equal(undefined);
            expect(authFactory.isAuthenticated()).to.equal(false);
            expect($location.url()).to.equal('/');
        });

        //flush out the remaining requests
        $httpBackend.flush();
    });


    /* logging out with remove auth */
    it('calling the logout will remove auth',function () {
        authFactory.currentUser = { username : 'test' };
        expect(authFactory.isAuthenticated()).to.equal(true);

        $httpBackend.expectPOST('/logout',{})
            .respond(function() {
                return [200, { success: true }];
            });


        //logout the user
        authFactory.logOut();

        //now the currentUser should be undefined and not auth
        expect(authFactory.currentUser).to.equal(undefined);
        expect(authFactory.isAuthenticated()).to.equal(false);
        expect($location.url()).to.equal('/');

        $httpBackend.flush();
    });

    it ('calling create account will create a new account', function() {
        var expectedUser = { username: "test@test.com", firstname: "first", lastname: "last", password: "password" };

        /*
         On the login, catch it and return some bad data!
         */
        $httpBackend.expectPOST('/signup', expectedUser)
            .respond(function() {
                return [201,{  "success": true, user: expectedUser  }];
            });

        authFactory.createAccount(expectedUser.username, expectedUser.password,expectedUser.firstname,expectedUser.lastname)
            .then(function(data) {
                /*
                 do assertions
                 */
                assert.isTrue(data, "result promise should return true")
                assert.isTrue(authFactory.isAuthenticated(), "there should be an authenticated user")
                assert.deepEqual(expectedUser,authFactory.currentUser, "he returned user should == authed user");
                assert.equal('/home',$location.url(), "the route should go to /home after signup success");
            });

        //flush out the remaining requests
        $httpBackend.flush();
    });

    it ('calling create account should not create duplicate emails', function() {
        var expectedUser = { username: "test@test.com", firstname: "first", lastname: "last", password: "password" };

        /*
         On the login, catch it and return some bad data!
         */
        $httpBackend.expectPOST('/signup', expectedUser)
            .respond(function() {
                return [201,{  "success": false, user: undefined  }];
            });

        authFactory.createAccount(expectedUser.username, expectedUser.password,expectedUser.firstname,expectedUser.lastname)
            .then(function(data) {

                /*
                 do assertions
                 */
                assert.isFalse(data, "result promise should return false")
                assert.isFalse(authFactory.isAuthenticated(), "there should not be any authenticared users")
                assert.equal(undefined,authFactory.currentUser, "current user should be undefined since");

                assert.equal('/',$location.url(), "the route should go to / after signup failure");
            });

        //flush out the remaining requests
        $httpBackend.flush();
    });
});