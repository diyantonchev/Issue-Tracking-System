(function () {
    'use strict';

    angular.module('issueTrackingSystem.core')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$q', '$location', 'identity', 'authentication'];

    function MainController($scope, $q, $location, identity, authentication) {
        var vm = this;

        vm.isLoggedIn = isLoggedIn;

        vm.registerData = {};
        vm.register = register;

        vm.loginData = {};
        vm.login = login;
        vm.logout = logout;

        $scope.currentUser = {};

        vm.newPasswordData = {};
        vm.changePassword = changePassword;

        vm.makeAdmin = makeAdmin;

        getCurrentUser();

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

        function getCurrentUser() {
            var result = isLoggedIn();
            if (result === true) {
                return identity.getCurrentUser()
                    .then(function (data) {
                        $scope.currentUser = data;
                        return vm.currentUser;
                    });
            }
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
            authentication.logout();
            $location.path('#/');
        }
    }

} ());
