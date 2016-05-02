(function () {
    'use strict';

    angular.module('issueTrackingSystem.projects')
        .controller('AllProjectsController', AllProjectsController);

    AllProjectsController.$inject = ['projects', 'getAllPojectsService'];
    function AllProjectsController(projects, getAllPojectsService) {
        var vm = this;

        vm.projects = getAllPojectsService;
    }

} ());