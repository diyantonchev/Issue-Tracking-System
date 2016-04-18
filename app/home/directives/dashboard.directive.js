(function () {
    'use strict';

    angular.module('issueTrackingSystem.home')
        .directive('dashboard', dashboard);

    function dashboard() {
        var dashboard = {
            restrict: 'A',
            templateUrl: 'app/home/templates/dashboard.html'
        };
        
        return dashboard;
    }
    
} ());

