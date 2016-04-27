(function () {
    'use strict';

    angular.module('issueTrackingSystem.projects')
        .controller('AllProjectsController', AllProjectsController);

    AllProjectsController.$inject = ['projects'];

    function AllProjectsController(projects) {
        var vm = this;

        vm.projects = [];
        
        getProjects();

        function getProjects() {
            return projects.getAllProjects().then(function (data) {
                vm.projects = data;
                return vm.projects;
            });
        }
    }

} ());