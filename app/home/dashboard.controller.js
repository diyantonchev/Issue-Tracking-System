(function () {
    'use strict';

    angular.module('issueTrackingSystem.home')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'projects', 'issues', 'identity', 'PAGE_SIZE'];
    function DashboardController($q, projects, issues, identity, PAGE_SIZE) {
        var vm = this;

        vm.projectsParams = {
            pageNumber: 1,
            pageSize: PAGE_SIZE
        };

        vm.issuesParams = {
            pageNumber: 1,
            pageSize: PAGE_SIZE
        };

        vm.issuesCount = 0;
        vm.userProjects = {};
        vm.userIssues = {};

        vm.reloadProjects = reloadProjects;
        vm.reloadIssues = reloadIssues;

        activate();

        function activate() {
            var promises = [reloadProjects(), reloadIssues()];
            $q.all(promises);
        }

        function reloadProjects() {
            var user = identity.getCurrentUser().then(function (user) {
                getUserProjects(vm.projectsParams, user.Id)
                    .then(function (data) {
                        // console.log(data.Projects);
                    });
            });
        }

        function reloadIssues() {
            getUserIssues(vm.issuesParams)
                .then(function (data) {
                    //console.log(data.Issues);
                });
        }

        function getUserProjects(params, id) {
            return projects.getUserProjects(params, id)
                .then(function (data) {
                    vm.userProjects = data;
                    return vm.userProjects;
                });
        }

        function getUserIssues(params) {
            return issues.getUserIssues(params).then(function (data) {
                vm.userIssues = data;
                vm.issuesCount = PAGE_SIZE * data.TotalPages;
                return vm.userIssues;
            });
        }
    }
} ());