(function () {
    'use strict';

    angular.module('issueTrackingSystem.projects')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['$scope', '$routeParams', '$location', 'identity', 'projects', 'usersData', 'getAllUsersService', 'toaster'];

    function ProjectController($scope, $routeParams, $location, identity, projects, usersData, getAllUsersService, toaster) {
        var vm = this;

        vm.issues = [];
        vm.authors = [];
        vm.assignees = [];
        vm.users = getAllUsersService;

        vm.submitEditedProject = submitEditedProject;
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
            getCurrentUser();
            getUsernames();
            getProjectById($routeParams.id);
            getProjectIssues($routeParams.id)
                .then(function (issues) {
                    issues.forEach(function (issue) {
                        if (issue.Author && (vm.authors.indexOf(issue.Author.Username) === -1)) {
                            vm.authors.push(issue.Author.Username);
                        }

                        if (issue.Assignee && (vm.assignees.indexOf(issue.Assignee.Username) === -1)) {
                            vm.assignees.push(issue.Assignee.Username);
                        }
                    });
                });
        }

        function getProjectById(id) {
            return projects.getProjectById(id)
                .then(function (data) {
                    $scope.project = data;
                    $scope.project.LeadId = data.Lead.Id;
                    return data;
                });
        }

        function getProjectIssues(id) {
            return projects.getProjectIssues(id).then(function (data) {
                vm.issues = data;
                return vm.issues;
            });
        }

        function submitEditedProject() {
            if (vm.leadUsername) {
                var lead = vm.users.filter(function (user) {
                    return user.Username === vm.leadUsername;
                })[0];

                if (lead) {
                    $scope.project.LeadId = lead.Id;
                }
            }

            editProject($scope.project, $routeParams.id);
        }

        function editProject(project, id) {
            projects.editProject(project, id).then(function (response) {
                console.log(response);
                toaster.pop('success', 'Success', 'Project successfullty edited');
                $location.path('/projects/' + $routeParams.id);
            }).catch(function (err) {
                toaster.pop('error', 'Error', err.Message);
            });
        }

        function getCurrentUser() {
            return identity.getCurrentUser().then(function (user) {
                $scope.currentUser = user;
            });
        }

        function getUsernames() {
            vm.usernames = [];
            vm.users.forEach(function (user) {
                vm.usernames.push(user.Username);
            });
        }
    }

} ());