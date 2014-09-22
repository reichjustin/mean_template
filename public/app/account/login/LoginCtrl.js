angular.module('app').controller('LoginCtrl', function($scope,$q,AuthFactory) {
    /*
        Triggered from the login button
     */
    $scope.signin = function() {

        var defer = $q.defer();

        /*
            Call the authentication service
        */
        AuthFactory.authenticateUser($scope.email,$scope.password).then(function(data) {
            defer.resolve(data);
        });

        return defer.promise;
    };

    /*
        Uses the AuthFactory to determine if a user is logged in
     */
    $scope.isAuthenticated = function() {
        return AuthFactory.isAuthenticated();
    };
});