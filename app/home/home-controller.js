angular.module('issueTrackingSystem.home',[
    'issueTrackingSystem.users.authentication'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home-view.html',
            controller: 'HomeController'
        })
    }])
    .controller('HomeController', ['$scope', function HomeController($scope) {
            $scope.isAuthenticated = true;
    }]);