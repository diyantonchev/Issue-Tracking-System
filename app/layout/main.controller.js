(function () {
    'use strict';

    angular.module('issueTrackingSystem.layout')
        .controller('MainController', MainController);

    MainController.$inject = ['$location', 'identity', 'authentication', 'toaster'];

    function MainController($location, identity, authentication, toaster) {
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
                    toaster.pop('success', 'Success', 'User successfully registered');
                });
        }

        function login(loginData, keepMeLogin) {
            return authentication.login(loginData, keepMeLogin)
                .then(function success(data) {
                    toaster.pop('success', 'Success', 'Successfully logged in');
                });
        }

        function isLoggedIn() {
            return authentication.isLoggedIn();
        }

        function changePassword(data) {
            authentication.changePassword(data).then(function () {
                toaster.pop('success', 'Success', 'Password successfully changed');
                $location.path('#/');
            });
        }

        function makeAdmin(user) {
            identity.makeAdmin(user)
                .then(function () {
                    //TODO
                });
        }

        function logout() {
            vm.currentUser = undefined;
            authentication.logout();
            toaster.pop('success', 'Success', 'Successfully logged out');
            $location.path('#/');
        }
    }

} ());