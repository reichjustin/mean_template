angular.module('app').controller('SignupCtrl', function($scope,$q,AuthFactory) {

    /*
     Promise method that will try to create an account if a username doesnt exist
     */
    $scope.signup = function() {
        var defer = $q.defer();

        //make the call to the create account on the AuthFactory
        AuthFactory.createAccount($scope.username,$scope.username).then(function(data) {
            defer.resolve(data);
        });

        return defer.promise;
    };
});