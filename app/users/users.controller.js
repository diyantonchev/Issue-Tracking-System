(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['authService'];

    function UsersController(authService) {
        var vm = this;
        
        vm.authService = authService;
    }

} ());
