angular.module('app').controller('LoginCtrl', function($scope,AuthFactory) {
    /*
        Triggered from the login button
     */
    $scope.signin = function() {
        /*
            Call the authentication service
        */
        AuthFactory.authenticateUser($scope.email,$scope.password);
    };

    /*
        Uses the AuthFactory to determine if a user is logged in
     */
    $scope.isAuthenticated = function() {
        return AuthFactory.isAuthenticated();
    };

    $scope.signup = function(username,password) {
        return AuthFactory.createAccount(username,password);
    };
});