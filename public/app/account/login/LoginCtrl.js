angular.module('app').controller('LoginCtrl', ['$scope', '$q', 'AuthFactory', function($scope,$q,AuthFactory) {
    /*
        Triggered from the login button
     */
    $scope.signin = function() {

        var defer = $q.defer();
        $scope.showInvalidLogin = false;

        /*
            Call the authentication service
        */
        AuthFactory.authenticateUser($scope.email,$scope.password).then(function(data) {

            if (data) {
                $scope.email = "";
                $scope.password = "";
            }

            $scope.showInvalidLogin = !data;

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

    $scope.logout = function() {
        AuthFactory.logOut();
    };
}]);