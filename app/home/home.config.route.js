(function () {
    'use strict';

    angular.module('issueTrackingSystem.home')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        });
    }
} ());