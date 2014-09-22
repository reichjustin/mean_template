
describe('Unit: LoginCtrl', function() {


    var ctrl, scope, $httpBackend;

    beforeEach(module('app'));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    beforeEach(inject(function ($controller, $rootScope) {

        //inject in our scope and mock auth factory object
        scope = $rootScope.$new();
        ctrl  = $controller('LoginCtrl',
            {
                $scope: scope
            });
    }));

    /* This should verify that the LoginCtrl exists as part of the app module */
    it('make sure ctrl exists in app', function() {
        expect(ctrl).not.to.equal(null);
    });

    /* This will make sure the scope was initialized */
    it('make sure scope variables properly set', function () {
       //make sure the identity is there
       expect(scope.email).to.equal(undefined);
       expect(scope.password).to.equal(undefined);
       expect(scope.isAuthenticated()).to.equal(false);
    });

    it('test the login - authenticated',function () {

        var expectedUser = { username: "reich.justin@gmail.com", password: "password" };

        $httpBackend.expectPOST('/login', expectedUser)
            .respond(function() {
                return [201,{ "success": true, user: expectedUser }];
            });

        /*
            set the scope values
            since the front end validation will not allow an invalid email no need to check anything else
         */
        scope.email = "reich.justin@gmail.com";
        scope.password = "password";

        //call the signin
        scope.signin().then(function(data) {
            assert.isTrue(data, "should return true becas");
            assert.isTrue(scope.isAuthenticated());
        });

        $httpBackend.flush();
    });

    it('test the login - invalid',function () {

        var expectedUser = { username: "reich.justin@gmail.com", password: "password" };

        $httpBackend.expectPOST('/login', expectedUser)
            .respond(function() {
                return [201,{ "success": false, user: undefined }];
            });

        /*
         set the scope values
         since the front end validation will not allow an invalid email no need to check anything else
         */
        scope.email = "reich.justin@gmail.com";
        scope.password = "password";

        //call the signin
        scope.signin().then(function(data) {
            assert.isFalse(data, "should return false because of invalid login");
            assert.isFalse(scope.isAuthenticated(), "should not be authenticated");
        });

        $httpBackend.flush();
    });

    it ('logout - calling logout should remove the auth', function() {
        var expectedUser = { username: "reich.justin@gmail.com", password: "password" };

        $httpBackend.expectPOST('/login', expectedUser)
            .respond(function() {
                return [201,{ "success": true, user: expectedUser }];
            });

        /*
         set the scope values
         since the front end validation will not allow an invalid email no need to check anything else
         */
        scope.email = "reich.justin@gmail.com";
        scope.password = "password";

        scope.signin().then(function(data) {
            assert.isTrue(data, "should return true becas");
            assert.isTrue(scope.isAuthenticated());
        });

        //calling logout should remove auth user
        scope.logout();
        assert.isFalse(scope.isAuthenticated());

        $httpBackend.flush();
    });
});