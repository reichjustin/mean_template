
describe('Unit: LoginCtrl', function() {


    var ctrl, scope,def, mockAuthFactory, mockNotifierFactory;

    beforeEach(module('app'));
    beforeEach(inject(function ($controller, $rootScope, $q) {
        def = $q.defer();

        /* Setup a stub for the AuthFactory */
         mockAuthFactory = sinon.stub({
            authenticateUser : function() { },
            isAuthenticated : function() { }
        });


        //inject in our scope and mock auth factory object
        scope = $rootScope.$new();
        ctrl  = $controller('LoginCtrl',
            {
                $scope: scope,
                AuthFactory: mockAuthFactory
            });
    }));

    /* This should verify that the LoginCtrl exists as part of the app module */
    it('make sure ctrl exists in app', function() {
        expect(ctrl).not.to.equal(null);
    });

    /* This will make sure the scope was initialized */
    it('make sure scope variables properly set', function () {
        //setup mock to return false
        mockAuthFactory.isAuthenticated.returns(false);

       //make sure the identity is there
       expect(scope.email).to.equal(undefined);
       expect(scope.password).to.equal(undefined);
       expect(scope.isAuthenticated()).to.equal(false);
    });

    it('test the login - authenticated',function () {

        //set the mock factory to return a promise
        //also setup the isAuthenticated to return true since it would
        def.resolve(true);
        mockAuthFactory.authenticateUser.returns(def.promise);
        mockAuthFactory.isAuthenticated.returns(true);


        /*
            set the scope values
            since the front end validation will not allow an invalid email no need to check anything else
         */
        scope.email = "reich.justin@gmail.com";
        scope.password = "password";

        //call the signin
        scope.signin();

        expect(scope.isAuthenticated()).to.equal(true);
    });

    it('test the login - invalid',function () {

        //set the mock factory to return a promise
        def.resolve(false);
        mockAuthFactory.authenticateUser.returns(def.promise);
        mockAuthFactory.isAuthenticated.returns(false);

        /*
         set the scope values
         since the front end validation will not allow an invalid email no need to check anything else
         */
        scope.email = "reich.justin@gmail.com";
        scope.password = "password";

        //call the signin
        scope.signin();

        expect(scope.isAuthenticated()).to.equal(false);
    });
});