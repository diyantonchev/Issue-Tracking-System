angular.module('issueTrackingSystem.home.directives.dashboard', [])
    .directive('dashboard', [function () {
        return {
            restrict: 'A',
            templateUrl: 'app/home/templates/dashboard.html'
        }
    }]);