(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location'];

    function RegisterController($location) {
        var vm = this;

        vm.userData = {
            email: null,
            password: null,
            confirmPassword: null,
            savePassword: false
        };


        vm.register = register;

        function register() {
            console.log(vm.userData);
        }
    }
} ());