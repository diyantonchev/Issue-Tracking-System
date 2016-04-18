(function () {
    'use strict';

    angular.module('issueTrackingSystem.home.directives')
        .directive('loginOrRegister', [function () {
            return {
                restrict: 'A',
                templateUrl: 'app/home/templates/login-or-register.html'
            };
        }]);
        
} ());

