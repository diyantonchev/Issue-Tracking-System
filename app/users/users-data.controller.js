(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .controller('UsersDataController', UsersDataController);

    UsersDataController.$inject = ['$q', '$location', 'identity', 'users'];

    function UsersDataController($q, $location, identity, users) {
        var vm = this;

        vm.currentUser = {};
        vm.users = [];

        //TODO config
        //   activate();

        function activate() {
            var promises = [getCurrentUser(), getUsers()];

            return $q.all(promises).then(function () {
                //TODO
                console.log(vm.currentUser.isAdmin);
                console.log(vm.currentUser);
                console.log(vm.users);
            });

        }

        function getCurrentUser() {
            return identity.getCurrentUser().then(function (data) {
                vm.currentUser = data;
                return vm.currentUser;
            });
        }

        function getUsers() {
            return users.getUsers().then(function (data) {
                vm.users = data;
                return vm.users;
            });
        }
    }

} ());
