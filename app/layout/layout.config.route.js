(function () {
    'use strict';

    angular.module('issueTrackingSystem.layout')
        .config(config);

    config.$inject = ['$routeProvider'];

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
    }
} ());