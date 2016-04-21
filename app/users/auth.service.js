(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .factory('authService', authService);

    authService.$inject = ['$http', '$q', 'BASE_URL'];

    function authService($http, $q, BASE_URL) {
        var service = {};

        function ifLoggedIn() {
            return sessionStorage.currentUser !== null;
        }

        return service;
    }

} ());