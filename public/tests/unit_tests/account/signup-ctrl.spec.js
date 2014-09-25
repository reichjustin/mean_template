
describe('Unit: SignupCtrl', function() {


    var ctrl, scope, $httpBackend, $location;

    beforeEach(module('app'));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $location = $injector.get('$location');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    beforeEach(inject(function ($controller, $rootScope) {
        //inject in our scope and mock auth factory object
        scope = $rootScope.$new();
        ctrl  = $controller('SignupCtrl',
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
        expect(scope.firstname).to.equal(undefined);
        expect(scope.lastname).to.equal(undefined);
    });

     it('test the signup - valid',function () {

         var expectedUser = { username: "test@test.com", firstname: "first", lastname: "last", password: "password" };


         $httpBackend.expectPOST('/signup', expectedUser)
             .respond(function() {
                 return [201,{ "success": true, user: expectedUser }];
             });

         //call the signup
         scope.email = "test@test.com";
         scope.password = "password";
         scope.firstname = "first";
         scope.lastname = "last";

         //call signup - which returns a promise of true/false if a user was created
         scope.signup().then(function(data) {
            assert.isTrue(data, "should be a valid user");
            assert.equal('/home', $location.url(), "success signup should go to the /home route");
         });

         $httpBackend.flush();
     });

    it('test the signup - invalid',function () {

        var expectedUser = { username: "test@test.com", firstname: "first", lastname: "last", password: "password" };

        $httpBackend.expectPOST('/signup', expectedUser)
            .respond(function() {
                return [201,{ "success": false, user: undefined }];
            });

        //call the signup
        scope.email = "test@test.com";
        scope.password = "password";
        scope.firstname = "first";
        scope.lastname = "last";

        //call signup - which returns a promise of true/false if a user was created
        scope.signup().then(function(data) {
            assert.isFalse(data, "should be an invalid user");
            assert.equal('/', $location.url(), "invalid signup should go to the / route");
        });

        $httpBackend.flush();
    });
});