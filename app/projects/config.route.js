(function () {
    'use strict';

    angular.module('issueTrackingSystem.projects')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {

        $routeProvider.when('/projects/:id', {
            templateUrl: 'app/projects/partials/project-page.html',
            controller: 'ProjectController',
            controllerAs: 'vm',
            resolve: {
                isAuthenticated: isAuthenticated
            }
        });

        $routeProvider.when('/projects/:id/edit', {
            templateUrl: 'app/projects/partials/edit-project.html',
            controller: 'ProjectController',
            controllerAs: 'vm',
            resolve: {
                isAuthenticated: isAuthenticated
            }
        });

        $routeProvider.when('/projects/:id/add-issue', {
            templateUrl: 'app/projects/partials/add-issue.html',
            controller: 'AddIssueController',
            controllerAs: 'vm',
            resolve: {
                isAuthenticated: isAuthenticated
            }
        });

        $routeProvider.when('/projects', {
            templateUrl: 'app/projects/partials/all-projects.html',
            controller: 'AllProjectsController',
            controllerAs: 'vm',
            resolve: {
                isAuthenticated: isAuthenticated,
                getAllPojectsService: getAllPojectsService,
                isAdminCheck: isAdminCheck
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

    getAllPojectsService.$inject = ['projects'];
    function getAllPojectsService(projects) {
        return projects.getAllProjects();
    }

    isAdminCheck.$inject = ['identity', '$location'];
    function isAdminCheck(identity, $location) {
        return identity.getCurrentUser().then(function (user) {
            if (!user.isAdmin) {
                $location.path('#/');
                //TODO notify
            }
        });
    }
} ());