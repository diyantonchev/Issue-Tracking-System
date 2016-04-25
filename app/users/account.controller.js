(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['$q', '$location', 'identity', 'authentication'];

    function AccountController($q, $location, identity, authentication) {
        var vm = this;

        vm.isLoggedIn = isLoggedIn;

        vm.registerData = {};
        vm.register = register;

        vm.loginData = {};
        vm.login = login;
        vm.logout = logout;

        vm.newPasswordData = {};
        vm.changePassword = changePassword;

        vm.makeAdmin = makeAdmin;

        function register(registerData, keepMeLogin) {
            authentication.register(registerData, keepMeLogin)
                .then(function success(data) {
                    console.log(data);
                }, function error(err) {
                    console.log(err.ModelState[""][0]);
                });
        }

        function login(loginData, keepMeLogin) {
            authentication.login(loginData, keepMeLogin)
                .then(function success(data) {
                    console.log(data);
                }, function error(err) {
                    console.log(err.error_description);
                });
        }

        function isLoggedIn() {
            return authentication.isLoggedIn();
        }

        function changePassword(data) {
            authentication.changePassword(data).then(function () {
                //TODO notify
                $location.path('#/');
            });
        }

        function makeAdmin(user) {
            authentication.makeAdmin(user)
                .then(function () {
                    //TODO
                });
        }

        function logout() {
            authentication.logout();
        }
    }

} ());
