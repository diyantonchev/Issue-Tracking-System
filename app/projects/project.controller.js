(function () {
    'use strict';

    angular.module('issueTrackingSystem.projects')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['$scope', '$q', '$location', 'identity', 'projects', 'toaster'];

    function ProjectController($scope, $q, $location, identity, projects, toaster) {
        var vm = this;

        vm.project = {};
        vm.issues = [];

        vm.authors = [];
        vm.assignees = [];

        vm.editProject = editProject;

        activate();

        function activate() {
            var id = getProjectId();

            getCurrentUser();

            getProjectById(id);

            getProjectIssues(id)
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

        function getProjectId() {
            var regex = /[0-9]+/;
            var id = regex.exec($location.path())[0];
            return id;
        }

        function getProjectById(id) {
            return projects.getProjectById(id)
                .then(function (data) {
                    vm.project = data;
                    $scope.project = data;
                    return vm.project;
                });
        }

        function getProjectIssues(id) {
            return projects.getProjectIssues(id).then(function (data) {
                vm.issues = data;
                return vm.issues;
            });
        }

        function editProject() {
            projects.editProject($scope.project, vm.project.Id).then(function (response) {
                toaster.pop('success', 'Success', 'Project successfullty edited');
                $location.path('/projects/' + vm.project.Id);
            });
        }

        function getCurrentUser() {
            return identity.getCurrentUser().then(function (user) {
                $scope.currentUser = user;
            });
        }
    }

} ());