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
        });

        $routeProvider.when('#/logout', {
            templateUrl: "",
            controller: 'MainController',
            controllerAs: 'vm'
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    }

} ());