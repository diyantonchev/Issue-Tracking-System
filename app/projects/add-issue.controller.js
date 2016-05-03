(function () {
    'use strict';

    angular.module('issueTrackingSystem.projects')
        .controller('AddIssueController', AddIssueController);

    AddIssueController.$inject = ['$routeParams', '$q', '$location', 'issues', 'usersData', 'projects', 'getAllUsersService', 'labels', 'toaster'];
    function AddIssueController($routeParams, $q, $location, issues, usersData, projects, getAllUsersService, labels, toaster) {
        var vm = this;

        vm.issue = {
            projectId: $routeParams.id
        };

        vm.project = {};
        vm.users = getAllUsersService;
        vm.submitIssue = submitIssue;

        vm.addLabel = addLabel;
        vm.removeLabel = removeLabel;
        vm.tags = [];

        activate();

        vm.usersAutocomplete = {
            options: {
                onlySelect: true,
                source: function (request, response) {
                    var data = vm.usernames;
                    data = vm.usersAutocomplete.methods.filter(data, request.term);

                    if (!data.length) {
                        data.push({
                            label: 'not found',
                            value: ''
                        });
                    }
                    response(data);
                },
            }
        };

        function activate() {
            var promises = [getProjectById($routeParams.id), getAvailableLabels(), getUsernames()];
            return $q.all(promises);
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
                vm.allLabels = data;
            });
        }

        function getUsernames() {
            vm.usernames = [];
            vm.users.forEach(function (user) {
                vm.usernames.push(user.Username);
            });
        }

        function addIssue(issue) {
            return issues.addIssue(issue).then(function (data) {
                toaster.pop('success', 'Success', 'Issue successfully added');
                $location.path('/projects/' + $routeParams.id);
            }).catch(function () {
                toaster.pop('error', 'Error', 'Chosen Assigne does not exists. Please choose Assignee from the list provided!');
            });
        }

        function submitIssue(data) {
            if (vm.labels) {
                vm.issue.labels = convertLabelsToObjects(vm.labels);
            }

            if (vm.assigneeUsername) {
                var assignee = vm.users.filter(function (user) {
                    return user.Username === vm.assigneeUsername;
                })[0];

                if (assignee) {
                    vm.issue.AssigneeId = assignee.Id;
                }
            }

            addIssue(vm.issue);
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

        function convertLabelsToObjects(labels) {
            var labelObjects = [];
            var labelNames = labels.split(',');
            labelNames.forEach(function (name, index) {
                labelObjects[index] = { name: name };
            });

            return labelObjects;
        }
    }

} ());