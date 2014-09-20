angular.module('app').controller('LoginCtrl', function($scope,$http,NotifierFactory,AuthFactory,UserFactory) {
    $scope.identity = UserFactory;

    $scope.signin = function() {
     /*
        Call the authentication service
      */
     AuthFactory.authenticateUser($scope.email,$scope.password).then(function(result) {
        NotifierFactory.notify(result);
     });
    };
});