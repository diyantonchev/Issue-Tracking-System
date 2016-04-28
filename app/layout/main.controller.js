(function () {
    'use strict';

    angular.module('issueTrackingSystem.layout')
        .controller('MainController', MainController);

    MainController.$inject = ['$location', 'identity', 'authentication'];

    function MainController($location, identity, authentication) {
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

        activate();

        function activate() {
            return identity.getCurrentUser().then(function (user) {
                vm.currentUser = user;
            });
        }

        function register(registerData, keepMeLogin) {
            authentication.register(registerData, keepMeLogin)
                .then(function success(data) {
                    console.log(data);
                    activate();
                }, function error(err) {
                    console.log(err.ModelState[""][0]);
                });
        }

        function login(loginData, keepMeLogin) {
            activate();
            authentication.login(loginData, keepMeLogin)
                .then(function success(data) {
                    console.log(data);    
                    activate();  
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
            identity.makeAdmin(user)
                .then(function () {
                    //TODO
                });
        }

        function logout() {
            vm.currentUser = undefined;
            authentication.logout();
            $location.path('#/');
        }
    }

} ());