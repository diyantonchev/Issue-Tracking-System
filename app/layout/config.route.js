(function () {
    'use strict';

    angular.module('issueTrackingSystem.layout')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/layout/partials/home.html',
            controller: 'MainController',
            controllerAs: 'vm'
        });

        $routeProvider.when('/profile/password', {
            templateUrl: 'app/layout/partials/change-password.html',
            controller: 'MainController',
            controllerAs: 'vm',
            resolve: {
                isAuthenticated: isAuthenticated
            }
        });

        $routeProvider.when('#/logout', {
            templateUrl: "",
            controller: 'MainController',
            controllerAs: 'vm',
            resolve: {
                isAuthenticated: isAuthenticated
            }
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    }

    isAuthenticated.$inject = ['$q', 'authentication'];
    function isAuthenticated($q, authentication) {
        if (authentication.isLoggedIn()) {
            return $q.when(true);
        }

        return $q.reject('Unauthorized Access');
    }

} ());