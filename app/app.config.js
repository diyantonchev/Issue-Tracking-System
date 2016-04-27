(function () {
    'use strict';

    angular.module('issueTrackingSystem')
        .config(config)
        .run(authorization);

    config.$inject = ['$routeProvider'];
    authorization.$inject = ['$http', '$location', 'authentication'];

    function config($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/partials/home.html',
            controller: 'MainController',
            controllerAs: 'vm'
        });

        $routeProvider.when('/profile/password', {
            templateUrl: 'app/home/partials/change-password.html',
            controller: 'MainController',
            controllerAs: 'vm'
        });

        $routeProvider.when('/projects/:id', {
            templateUrl: 'app/projects/partials/project-page.html',
            controller: 'ProjectController',
            controllerAs: 'vm'
        });

        $routeProvider.when('/projects/:id/edit', {
            templateUrl: 'app/projects/partials/edit-project.html',
            controller: 'ProjectController',
            controllerAs: 'vm'
        });

        $routeProvider.when('/projects/:id/add-issue', {
            templateUrl: 'app/projects/partials/add-issue.html',
            controller: 'AddIssueController',
            controllerAs: 'vm'
        });

        $routeProvider.when('/projects', {
            templateUrl: 'app/projects/partials/all-projects.html',
            controller: 'AllProjectsController',
            controllerAs: 'vm'
        });

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