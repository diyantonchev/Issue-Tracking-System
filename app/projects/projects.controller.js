(function () {
    'use strict';

    angular.module('issueTrackingSystem.projects')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['projects'];

    function ProjectsController(projects) {
        var vm = this;
        
        vm.getAllProjects = getAllProjects;
        vm.addProject = addProject;
        vm.getProjectById = getProjectById;
        vm.editProject = editProject;
        
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