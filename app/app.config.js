(function () {
    'use strict';

    angular.module('issueTrackingSystem')
        .config(config)
        .run(authorization);

    config.$inject = ['$routeProvider'];
    authorization.$inject = ['$http', '$location', 'authentication'];

    function config($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/layout/partials/home.html',
            controller: 'AccountController',
            controllerAs: 'vm'
        });

        $routeProvider.when('/profile/password', {
            templateUrl: 'app/users/partials/change-password.html',
            controller: 'AccountController',
            controllerAs: 'vm'
        });

        $routeProvider.when('/projects', {
            templateUrl: 'app/projects/partials/all-projects.html',
            controller: 'ProjectsController',
            controllerAs: 'vm'
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    }

    function authorization($http, $location, authentication) {
        if (authentication.isLoggedIn()) {
            var accessToken;
            if (sessionStorage.authenticationData) {
                accessToken = JSON.parse(sessionStorage.authenticationData).access_token;
            } else if (localStorage.authenticationData) {
                accessToken = JSON.parse(localStorage.authenticationData).access_token;
            }

            $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
        }
    }

} ());