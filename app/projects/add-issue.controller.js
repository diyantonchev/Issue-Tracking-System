(function () {
    'use strict';

    angular.module('issueTrackingSystem.projects')
        .controller('AddIssueController', AddIssueController);

    AddIssueController.$inject = ['$routeParams', '$q', 'issues', 'projects', 'getAllUsersService', 'toaster'];

    function AddIssueController($routeParams, $q, issues, projects, getAllUsersService, toaster) {
        var vm = this;

        vm.issue = {
            projectId: $routeParams.id
        };

        vm.project = {};
        // vm.users = getAllUsersService;

        getProjectById($routeParams.id);

        vm.addIssue = addIssue;

        function addIssue(data) {
            if (vm.labels) {
                vm.issue.labels = [];
                var labelNames = vm.labels.split(/\W+/);
                labelNames.forEach(function (name, index) {
                    vm.issue.labels[index] = { name: name };
                });
            }
            
            vm.issue.AssigneeId = '8a2c98e0-8e6c-4d00-81b4-36e10dc62966';

            issues.addIssue(vm.issue).then(function () {
                toaster.pop('success', 'Success', 'Issue successfully created');
            });
        }

        function getProjectById(id) {
            return projects.getProjectById(id)
                .then(function (data) {
                    vm.project = data;
                    return vm.project;
                });
        }

    }

} ());