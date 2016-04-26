(function () {
    'use strict';

    angular.module('issueTrackingSystem.core')
        .factory('identity', identity);

    identity.$inject = ['$http', '$q', 'BASE_SERVICE_URL'];

    function identity($http, $q, BASE_SERVICE_URL) {

        var service = {
            getCurrentUser: getCurrentUser,
            makeadmin: makeAdmin
        };

        return service;

        function getCurrentUser() {
            var url = BASE_SERVICE_URL + '/users/me';

            var request = {
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            return $http(request).then(currentUserComplete);

            function currentUserComplete(response) {
                return response.data;
            }
        }
        
         function makeAdmin(user) {
            var url = BASE_SERVICE_URL + '/users/makeadmin';
            var request = {
                method: 'PUT',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: user
            };

            return $http(request);
        }
    }

} ());