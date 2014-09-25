angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app')
    .config(['$routeProvider', '$locationProvider', '$rootScopeProvider','$injector',function($routeProvider, $locationProvider,$injector) {
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

var validateLogIn = function (RouteChecker) {
   return RouteChecker.checkRoute();
};