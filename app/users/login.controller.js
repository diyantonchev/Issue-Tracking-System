(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'identity'];

    function LoginController($location, identity) {
        var vm = this;

        vm.userData = {
            email: null,
            password: null,
        };

        vm.keepMeLogin = false;

        vm.login = login;

        function login() {
            identity.login(vm.userData, vm.keepMeLogin, success, error);
        }

        function success(data) {
            //TODO toastr notify
            console.log(data);
        }

        function error(errObj) {
            console.log(errObj.data.error_description);
        }
    }
} ());