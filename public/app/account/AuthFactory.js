angular.module('app').factory('AuthFactory', function($http, $q, UserFactory) {
    return {
      authenticateUser: function(username,password) {
          var defer = $q.defer();

          $http.post('/login',{ username: username, password: password }).then(function(result) {
              if (result.data.success) {
                  UserFactory.currentUser = result.data.user;

                  defer.resolve(true);
              } else {
                  defer.resolve(false);
              }
          });

          return defer.promise;
      }
    };
});