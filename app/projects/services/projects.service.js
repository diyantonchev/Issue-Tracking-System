(function () {
    'use strict';

    angular.module('issueTrackingSystem')
        .factory('projects', projects);

    projects.$inject = ['$http', '$q'];

    function projects($http, $q) {
        var service = {
            getAllProjects: getAllProjects,
            getProjectById: getProjectById,
            addProject: addProject,
            editProject: editProject
        };

        return service;

        function getAllProjects() {

        }

        function getProjectById() {

        }

        function addProject() {

        }

        function editProject() {

        }
    }

} ());