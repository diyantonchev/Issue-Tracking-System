(function () {
    'use strict';

    angular.module('issueTrackingSystem.projects')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'projects', 'identity', 'PROJECTS_PAGE_SIZE'];

    function DashboardController($q, projects, identity, PROJECTS_PAGE_SIZE) {
        var vm = this;

        vm.projectsParams = {
            pageNumber: 1,
            pageSize: PROJECTS_PAGE_SIZE
        };

        vm.userProjects = {};

        vm.reloadProjects = reloadProjects;
        reloadProjects();

        function reloadProjects() {
            identity.getCurrentUser().then(function (user) {
               // console.log(user);
                getUserProjects(vm.projectsParams, user.Id)
                    .then(function (data) {
                        console.log(data);
                    });
            });
        }

        function getUserProjects(params, id) {
            return projects.getUserProjects(params, id)
                .then(function (data) {
                    vm.userProjects = data;
                    return vm.userProjects;
                });
        }
    }
} ());