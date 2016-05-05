(function () {
    'use strict';

    angular.module('issueTrackingSystem.home')
        .controller('MainController', MainController);

    MainController.$inject = ['$location', 'identity', 'authentication', 'toaster'];
    function MainController($location, identity, authentication, toaster) {
        var vm = this;

        vm.isLoggedIn = isLoggedIn;

        vm.loginData = {};
        vm.login = login;
        vm.logout = logout;

        vm.registerData = {};
        vm.register = register;

        vm.newPasswordData = {};
        vm.changePassword = changePassword;

        vm.makeAdmin = makeAdmin;

        function login(loginData, keepMeLogin) {
            return authentication.login(loginData, keepMeLogin)
                .then(function success(data) {
                    toaster.pop('success', 'Success', 'Successfully logged in');
                });
        }

        function register(registerData, keepMeLogin) {
            return authentication.register(registerData, keepMeLogin)
                .then(function success(data) {
                    toaster.pop('success', 'Success', 'User successfully registered');
                });
        }

        function isLoggedIn() {
            return authentication.isLoggedIn();
        }

        function logout() {
            authentication.logout();
            toaster.pop('success', 'Success', 'Successfully logged out');
            $location.path('#/');
        }

        function changePassword(data) {
            return authentication.changePassword(data).then(function () {
                toaster.pop('success', 'Success', 'Password successfully changed');
                $location.path('#/');
            });
        }

        function makeAdmin(user) {
            return identity.makeAdmin(user)
                .then(function () {
                    toaster.notify('success', 'Success', 'User has been made admin');
                });
        }
    }

} ());