(function () {
    'use strict';

    angular.module('issueTrackingSystem.projects')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['$q', '$location', 'projects', 'issues', 'identity', 'BASE_SERVICE_URL'];

    function ProjectController($q, $location, projects, issues, identity, BASE_SERVICE_URL) {
        var vm = this;
        var id = getProjectId();

        vm.project = {};
        vm.issues = {};

        getProjectById(id);
        reloadIssues(id);

        function getProjectId() {
            var regex = /[0-9]+/;
            var id = regex.exec($location.path())[0];
            return id;
        }

        function reloadIssues(id) {
            return projects.getProjectIssues(id).then(function (data) {
                vm.issues = data;
                return vm.issues;
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