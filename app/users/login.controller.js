(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$q', 'authentication'];

    function LoginController($q, authentication) {
        var vm = this;

        vm.userData = {
            email: null,
            password: null,
        };

        vm.keepMeLogin = false;
        vm.login = login;

        function login() {
            authentication.login(vm.userData, vm.keepMeLogin, success, error);
        }

        function success(data) {
            //TODO toastr notify
            console.log(data);
        }

        function error(errObj) {
            //TODO toastr notify
            console.log(errObj.data.error_description);
            return $q.reject(errObj);
        }
    }
} ());