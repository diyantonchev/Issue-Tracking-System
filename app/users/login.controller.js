(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location'];

    function LoginController($location) {
        var vm = this;

        vm.userData = {
            username: null,
            password: null,
            keepMeLogin: false
        };

        vm.login = login;

        function login() {
            console.log(vm.userData);
        }
    }
} ());