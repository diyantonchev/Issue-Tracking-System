(function () {
    'use strict';

    angular.module('issueTrackingSystem.projects')
        .controller('AddIssueController', AddIssueController);

    AddIssueController.$inject = ['$scope', '$routeParams', '$q', 'issues', 'usersData', 'projects', 'getAllUsersService', 'labels', 'toaster'];

    function AddIssueController($scope, $routeParams, $q, issues, usersData, projects, getAllUsersService, labels, toaster) {
        var vm = this;

        vm.issue = {
            projectId: $routeParams.id
        };

        vm.project = {};
        $scope.users = getAllUsersService;
        $scope.allLabels = [];
        vm.tags = [];
        vm.addLabel = addLabel;
        vm.removeLabel = removeLabel;
        vm.submitIssue = submitIssue;

        activate();

        function activate() {
            var promises = [getProjectById($routeParams.id), getAvailableLabels()];
            return $q.all(promises);
        }

        function submitIssue(data) {
            if (vm.labels) {                
                vm.issue.labels = convertLabelsToObjects(vm.labels);
                console.log(vm.issue.labels);
            }

            var username = $('#assigneeId').val();
            usersData.getUserByUsername(username).then(function (userId) {
                vm.issue.AssigneeId = userId;
                issues.addIssue(vm.issue).then(function (data) {
                    console.log(data);
                    toaster.pop('success', 'Success', 'Issue successfully added');
                }).catch(function () {
                    toaster.pop('error', 'Error', 'Chosen Assigne does not exists. Please choose Assignee from the list provided!');
                });
            });
        }

        function getProjectById(id) {
            return projects.getProjectById(id)
                .then(function (data) {
                    vm.project = data;
                    return vm.project;
                });
        }

        function getAvailableLabels() {
            labels.getAvailableLabels().then(function (data) {
                $scope.allLabels = data;
            });
        }

        function convertLabelsToObjects(labels) {
            var labelObjects = [];
            var labelNames = labels.split(',');
            labelNames.forEach(function (name, index) {
                labelObjects[index] = { name: name };
            });
            
            return labelObjects;
        }

        function addLabel(newLabel) {
            if (newLabel !== '' && vm.tags.indexOf(newLabel) === -1) {
                vm.tags.push($('#labels').val());
                vm.labels = vm.tags.join();
            }

            vm.newLabel = '';
        }

        function removeLabel(index) {
            vm.tags.splice(index, 1);
            vm.labels = vm.tags.join();
        }

    }

} ());