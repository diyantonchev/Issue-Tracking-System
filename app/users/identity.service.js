(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .factory('identity', identity);

    identity.$inject = ['$http', '$q', 'BASE_URL'];

    function identity($http, $q, BASE_URL) {
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