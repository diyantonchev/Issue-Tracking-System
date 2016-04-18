(function () {
    'use strict';

    angular.module('issueTrackingSystem')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/' });
    }
    
} ());