(function () {
    'use strict';

    angular.module('issueTrackingSystem.projects')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['$q', 'projects', 'issues', 'identity', 'BASE_SERVICE_URL'];

    function ProjectController($q, projects, issues, identity, BASE_SERVICE_URL) {
        var vm = this;

        function reloadIssues() {
            getProjectIssues(id, vm.issuesParams).then(function (data) {
                //console.log(data);
            });
        }

        function getProjectById(id) {
            return projects.getProjectById(id).then(function (data) {

            });
        }

    }

} ());