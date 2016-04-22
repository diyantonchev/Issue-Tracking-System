(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$q', 'identity', 'authentication', 'users'];

    function UsersController($q, identity, authentication, users) {
        var vm = this;
        var authorizationHeader = identity.getAuthorizationHeader();

        vm.isLoggedIn = isLoggedIn;
        vm.logout = logout;
        vm.currentUser = {};
        vm.users = [];

        activate();

        function activate() {
            var promises = [getCurrentUser(), getUsers()];

            return $q.all(promises).then(function () {
                //console.log(vm.currentUser.isAdmin);
                //console.log(vm.currentUser);
                //console.log(vm.users);
            });
        }

        function isLoggedIn() {
            return identity.isLoggedIn();
        }

        function getCurrentUser() {
            return identity.getCurrentUser().then(function (data) {
                vm.currentUser = data;
                return vm.currentUser;
            });
        }

        function getUsers() {
            return users.getUsers(authorizationHeader).then(function (data) {
                vm.users = data;
                return vm.users;
            });
        }

        function logout() {
            authentication.logout();
        }
    }

} ());
