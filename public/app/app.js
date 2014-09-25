angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app')
    .config(['$routeProvider', '$locationProvider', '$rootScopeProvider',function($routeProvider, $locationProvider, $rootScopeProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/',
                {
                    templateUrl : '/partials/main/main',
                    controller : 'MainCtrl'
                })
            .when('/home',
                {
                    templateUrl: '/partials/home/home',
                    controller: 'HomeCtrl',
                    resolve: { factory: validateLogIn }
                })
            .otherwise({ redirectTo: '/' });
}]);

var validateLogIn = function ($q, $location, AuthFactory) {
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
};