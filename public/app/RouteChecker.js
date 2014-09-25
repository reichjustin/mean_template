angular.module('app')
    .factory('RouteChecker',['$q','$location','AuthFactory',function($q, $location, AuthFactory) {
    return {
        checkRoute: function() {
            //if the user is logged in then let it go
            if (AuthFactory.isAuthenticated()) {
                return true;
            } else {
                //setup a rejected promise since the user is not authenticated
                var deferred = $q.defer();
                deferred.reject();

                //redirect back to the index page
                $location.path("/");

                //return this promise to be consumed on the route resolve
                return deferred.promise;
            }
        }
    };
}]);