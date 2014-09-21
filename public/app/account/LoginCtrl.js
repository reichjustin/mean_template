angular.module('app').controller('LoginCtrl', function($scope,AuthFactory) {
    var  _af = AuthFactory;

    $scope.isAuthenticated = function() { return _af.isAuthenticated(); }

    $scope.signin = function() {
         /*
            Call the authentication service
          */
         _af.authenticateUser($scope.email,$scope.password);
    };
});