angular.module('app').factory('AuthFactory',['$http', '$q', function($http,$q) {
    return {
      /*
          The logged in user info - This will be expanded
      */
      currentUser: undefined,

       /*
           This will take in the username and password to validate

           This will return a promise object
       */
      authenticateUser: function(username,password) {
          var that = this,  def = $q.defer();

          /*
            Call the login POST method to validate the username/password combo
          */
          $http.post('/login',{ username: username, password: password }).then(function(result) {

              //success will be true if valid or false if not
              if (result.data.success) {
                  //set the currentUser to the return value
                  that.currentUser = result.data.user;

                  //defer value to true
                  def.resolve(true);
              } else {
                  that.currentUser = undefined;

                  //defer value to false
                  def.resolve(false);
              }
          });

          //return the entire promise
          return def.promise;
      },

      /*
          Helper method that will determine if there is a user logged in
      */
      isAuthenticated : function () {
        return !!this.currentUser;
      },

       /*
           Helper method that will log out a user
       */
      logOut: function() {
        //set the current user to undefined
        this.currentUser = undefined;
      },

      createAccount: function(username,password) {
        var that = this,  def = $q.defer();

          /*
           Call the signup with the username and password to create
           */
          $http.post('/signup',{ username: username, firstname: username, lastname: username }).then(function(result) {

              //success will be true if valid or false if not
              if (result.data.success) {
                  //set the currentUser to the return value
                  that.currentUser = result.data.user;

                  //defer value to true
                  def.resolve(true);
              } else {
                  that.currentUser = undefined;

                  //defer value to false
                  def.resolve(false);
              }
          });

          //return the entire promise
          return def.promise;
      }
    };
}]);