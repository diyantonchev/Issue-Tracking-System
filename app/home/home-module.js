(function () {
    'use strict';

    angular.module('issueTrackingSystem.home', [
        'issueTrackingSystem.users',
        'issueTrackingSystem.home.directives'
    ])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'app/home/home-view.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            });
        }]);

} ());

