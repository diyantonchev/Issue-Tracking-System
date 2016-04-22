(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$q', 'authentication'];

    function RegisterController($q, authentication) {
        var vm = this;

        vm.userData = {
            email: null,
            password: null,
            confirmPassword: null,
        };

        vm.savePassword = false;
        vm.register = register;

        function register() {
            authentication.register(vm.userData, vm.savePassword, success, error);
        }

        function success(data) {
            //TODO toastr notify
            console.log(data);
        }

        function error(errObj) {
            //TODO toastr notify
            console.log(errObj.data.ModelState[""]);
            return $q.reject(errObj);
        }
    }

} ());