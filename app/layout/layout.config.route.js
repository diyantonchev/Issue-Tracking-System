(function () {
    'use strict';

    angular.module('issueTrackingSystem.layout')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/layout/partials/home.html',
            controller: 'UsersController',
            controllerAs: 'vm'
        });
    }
} ());