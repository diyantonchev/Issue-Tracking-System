(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['authentication'];

    function UsersController(authentication) {
        var vm = this;
        vm.isAuthenticated = true;
    }

} ());
