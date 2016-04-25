(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .factory('identity', identity);

    identity.$inject = ['$http', '$q', 'BASE_SERVICE_URL'];

    function identity($http, $q, BASE_SERVICE_URL) {

        var service = {
            getCurrentUser: getCurrentUser,
            getAuthorizationHeader: getAuthorizationHeader,
        };

        return service;

        function getCurrentUser() {
            var url = BASE_SERVICE_URL + '/users/me';

            var request = {
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAuthorizationHeader()
                }
            };

            return $http(request).then(currentUserComplete);

            function currentUserComplete(response) {
                return response.data;
            }
        }

        function getAuthorizationHeader() {
            var header;
            if (sessionStorage.currentUser) {
                header = 'Bearer ' + JSON.parse(sessionStorage.currentUser).access_token;
            } else if (localStorage.currentUser) {
                header = 'Bearer ' + JSON.parse(localStorage.currentUser).access_token;
            }

            return header;
        }

    }

} ());