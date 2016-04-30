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
        $scope.users = getAllUsersService;

        vm.submitEditedProject = submitEditedProject;
        activate();

        function activate() {
            getCurrentUser();
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
            if ($scope.currentUser.isAdmin) {
                var username = $('#projectLeadId').val();
                if (username) {
                    usersData.getUserByUsername(username).then(function (userId) {
                        $scope.project.LeadId = userId;
                        editProject($scope.project, $routeParams.id);
                    });
                } else {
                    $scope.project.LeadId = $scope.project.Lead.Id;
                    editProject($scope.project, $routeParams.id);
                }

            } else {
                $scope.project.LeadId = $scope.project.Lead.Id;
                editProject($scope.project, $routeParams.id);
            }
        }

        function editProject(project, id) {
            projects.editProject(project, id).then(function (response) {
                toaster.pop('success', 'Success', 'Project successfullty edited');
                console.log(response.data);
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
    }

} ());