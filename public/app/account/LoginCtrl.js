angular.module('app').controller('LoginCtrl', function($scope,$http) {
    $scope.signin = function(e,p) {
      var user = { username : $scope.email, password: $scope.password || '' };
      $http.post('/login',user).then(function(result) {
        alert(result.data.success);
      });
    };
});