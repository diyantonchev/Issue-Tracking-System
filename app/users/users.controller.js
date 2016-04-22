(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['identity'];

    function UsersController(identity) {
        var vm = this;

        vm.isLoggedIn = isLoggedIn;
        vm.logout = logout;

        function isLoggedIn() {
            return identity.isLoggedIn();
        }

        function logout() {
            identity.logout();
        }

    }

} ());
