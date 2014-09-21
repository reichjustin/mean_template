describe('Unit: LoginCtrl', function() {
    beforeEach(module('app'));
    var ctrl, scope;

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ctrl  = $controller('LoginCtrl', { $scope: scope });
    }));

    /* This should verify that the LoginCtrl exists as part of the app module */
    it('make sure ctrl exists in app', function() {
        expect(ctrl).not.to.equal(null);
    });

    /* This will make sure the scope was initialized */
    it('make sure scope variables properly set', function () {
       //make sure the identity is there
       expect(scope.identity).not.to.equal(undefined);
       expect(scope.email).to.equal(undefined);
       expect(scope.password).to.equal(undefined);
    });

    it('make sure scope variables properlay set',inject( function (NotifierFactory,AuthFactory) {

    }));
})