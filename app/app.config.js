(function () {
    'use strict';

    angular.module('issueTrackingSystem')
        .config(config)
        .run(authorization);

    config.$inject = ['$routeProvider'];
    authorization.$inject = ['$http', '$location', 'authentication'];

    function config($routeProvider) {
        /*   $routeProvider.when('/issues/:id', {
               templateUrl: 'app/issues/partials/issue-page.html',
               controller: 'IssueController',
               controllerAs: 'vm'
           });*/

        $routeProvider.otherwise({ redirectTo: '/' });
    }

    function authorization($http, $location, authentication) {
        if (authentication.isLoggedIn()) {
            var accessToken;
            if (sessionStorage.authenticationData) {
                accessToken = JSON.parse(sessionStorage.authenticationData).access_token;
            } else if (localStorage.authenticationData) {
                accessToken = JSON.parse(localStorage.authenticationData).access_token;
            }

            $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
        }
    }

} ());