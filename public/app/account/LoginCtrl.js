angular.module('app').controller('LoginCtrl', function($scope,AuthFactory) {
    //set the AuthFactory to a local var
    var  _af = AuthFactory;

    /*
        This will be a helper method that calls the AuthFactory isAuthenticated
     */
    $scope.isAuthenticated = function() { return _af.isAuthenticated(); }

    /*
        Triggered from the login button
     */
    $scope.signin = function() {
        /*
            Call the authentication service
        */
        _af.authenticateUser($scope.email,$scope.password);
    };
});