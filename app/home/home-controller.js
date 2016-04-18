(function () {
    'use strict';

    angular.module('issueTrackingSystem.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = [];

    function HomeController() {
        var vm = this;
        vm.isAuthenticated = true;
    }
    
} ());
