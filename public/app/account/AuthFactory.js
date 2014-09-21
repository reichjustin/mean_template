angular.module('app').factory('AuthFactory', function($http,$q) {
    return {
      currentUser: undefined,
      authenticateUser: function(username,password) {
          var that = this,  def = $q.defer();

          $http.post('/login',{ username: username, password: password }).then(function(result) {
              if (result.data.success) {
                  that.currentUser = result.data.user;

                  def.resolve(true);
              } else {
                  that.currentUser = undefined;

                  def.resolve(false);
              }
          });

          return def.promise;
      },
      isAuthenticated : function () {
        return !!this.currentUser;
      },
      logOut: function() {
        this.currentUser = undefined;
      }
    };
});