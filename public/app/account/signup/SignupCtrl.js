angular.module('app').controller('SignupCtrl',['$scope', '$q', 'AuthFactory', function($scope,$q,AuthFactory) {

    //setup the show existing username
    $scope.showExistingUsername = false;

    /*
     Promise method that will try to create an account if a username doesnt exist
     */
    $scope.signup = function() {
        var defer = $q.defer();

        //make the call to the create account on the AuthFactory
        AuthFactory.createAccount($scope.email,$scope.email).then(function(data) {
            $scope.showExistingUsername = !data;

            if (data) {
                $scope.email = "";
                $scope.firstname = "";
                $scope.lastname = "";
            }

            defer.resolve(data);
        });

        return defer.promise;
    };
}] );