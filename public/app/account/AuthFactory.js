angular.module('app').factory('AuthFactory',['$http', '$q', '$location', function($http,$q,$location) {
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

                  //set the new path
                  $location.path('/home');

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

        //call node to logout!
        $http.post('/logout',{}).then(function(result) {

            //set the route to the root path /
            $location.path('/');
        });
      },

      createAccount: function(username,password,firstName,lastName) {
        var that = this,  def = $q.defer();

          /*
           Call the signup with the username and password to create
           */
          $http.post('/signup',{ username: username, firstname: firstName, lastname: lastName, password: password }).then(function(result) {

              //success will be true if valid or false if not
              if (result.data.success) {
                  //set the currentUser to the return value
                  that.currentUser = result.data.user;

                  //set the new path
                  $location.path('/home');

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