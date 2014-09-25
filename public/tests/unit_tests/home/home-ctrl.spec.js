describe('Unit: HomeCtrl', function() {
    beforeEach(module('app'));
    var ctrl, scope;

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ctrl  = $controller('HomeCtrl', { $scope: scope });
    }));

    /* This should verify that the LoginCtrl exists as part of the app module */
    it('make sure ctrl exists in app', function() {
        expect(ctrl).not.to.equal(null);
    });
})