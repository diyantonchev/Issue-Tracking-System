angular.module('issueTrackingSystem.home.directives.loginOrRegister', [])
    .directive('loginOrRegister', [function () {
        return {
            restrict: 'A',
            templateUrl: 'app/home/templates/login-or-register.html'
        }
    }]);