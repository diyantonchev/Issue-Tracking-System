(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', 'identity'];

    function RegisterController($location, identity) {
        var vm = this;

        vm.userData = {
            email: null,
            password: null,
            confirmPassword: null,
        };

        vm.savePassword = false;

        vm.register = register;

        function register() {
            identity.register(vm.userData, success, error);
        }

        function success(data) {
            //TODO toastr notify
            console.log(data);
        }

        function error(errObj) {
            console.log(errObj.data.ModelState[""]);
        }
    }

} ());