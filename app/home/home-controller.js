(function () {
    'use strict';

    angular.module('issueTrackingSystem.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['authentication'];

    function HomeController(authentication) {
        var vm = this;
        vm.isAuthenticated = true;
    }

} ());
