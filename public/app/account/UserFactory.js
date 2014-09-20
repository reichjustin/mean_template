angular.module('app').factory('UserFactory', function() {
   return {
       currentUser: undefined,
       isAuthenticated : function () {
           return !!this.currentUser;
       }
   };
});