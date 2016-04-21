(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .factory('authService', authService);

    authService.$inject = ['$http', '$q', 'BASE_URL'];

    function authService($http, $q, BASE_URL) {
        var service = {
            isLoggedIn: isLoggedIn
        };

        function isLoggedIn() {
           return sessionStorage.currentUser !== undefined;
           //return true;
        }

        return service;
    }

} ());