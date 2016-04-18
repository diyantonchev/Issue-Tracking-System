angular.module('issueTrackingSystem.home.directives')
    .directive('dashboard', [function () {
        return {
            restrict: 'A',
            templateUrl: 'app/home/templates/dashboard.html'
        }
    }]);