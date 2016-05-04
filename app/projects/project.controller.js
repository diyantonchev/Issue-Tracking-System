(function () {
    'use strict';

    angular.module('issueTrackingSystem.projects')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['$routeParams', '$location', 'identity', 'projects', 'usersData', 'getAllUsersService', 'toaster'];
    function ProjectController($routeParams, $location, identity, projects, usersData, getAllUsersService, toaster) {
        var vm = this;

        vm.authors = [];
        vm.assignees = [];
        vm.issues = [];
        vm.submitEditedProject = submitEditedProject;
        vm.users = getAllUsersService;

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

        function getCurrentUser() {
            return identity.getCurrentUser().then(function (user) {
                vm.currentUser = user;
            });
        }

        function getProjectById(id) {
            return projects.getProjectById(id)
                .then(function (data) {
                    vm.project = data;
                    vm.project.LeadId = data.Lead.Id;
                    return data;
                });
        }

        function getUsernames() {
            vm.usernames = [];
            vm.users.forEach(function (user) {
                vm.usernames.push(user.Username);
            });
        }

        function getProjectIssues(id) {
            return projects.getProjectIssues(id).then(function (data) {
                vm.issues = data;
                return vm.issues;
            });
        }

        function editProject(project, id) {
            projects.editProject(project, id).then(function (response) {
                toaster.pop('success', 'Success', 'Project successfully edited');
                $location.path('/projects/' + $routeParams.id);
            }).catch(function (err) {
                toaster.pop('error', 'Error', err.Message);
            });
        }

        function submitEditedProject() {
            if (vm.leadUsername) {
                var lead = vm.users.filter(function (user) {
                    return user.Username === vm.leadUsername;
                })[0];

                if (lead) {
                    vm.project.LeadId = lead.Id;
                }
            }

            editProject(vm.project, $routeParams.id);
        }

    }

} ());