(function () {
    'use strict';

    angular.module('issueTrackingSystem.issues')
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {

        $routeProvider.when('/issues/:id', {
            templateUrl: 'app/issues/partials/issue-page.html',
            controller: 'IssueController',
            controllerAs: 'vm',
            resolve: {
                isAuthenticated: isAuthenticated,
            }
        });
        
        $routeProvider.when('/issues/:id/edit', {
            templateUrl: 'app/issues/partials/edit-issue-page.html',
            controller: 'EditIssueController',
            controllerAs: 'vm',
            resolve: {
                isAuthenticated: isAuthenticated,
                getAllUsersService: getAllUsersService
            }
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    }

    isAuthenticated.$inject = ['$q', 'authentication'];
    function isAuthenticated($q, authentication) {
        if (authentication.isLoggedIn()) {
            return $q.when(true);
        }

        return $q.reject('Unauthorized Access');
    }

    getAllUsersService.$inject = ['usersData'];
    function getAllUsersService(usersData) {
        return usersData.getUsers();
    }

} ());