(function () {
    'use strict';

    angular.module('issueTrackingSystem.core')
        .factory('usersData', usersData);

    usersData.$inject = ['$http', '$q', 'BASE_SERVICE_URL'];

    function usersData($http, $q, BASE_SERVICE_URL) {

        var service = {
            getUsers: getUsers,
            getUserByUsername: getUserByUsername
        };

        return service;

        function getUsers() {
            var url = BASE_SERVICE_URL + '/users/';

            var request = {
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            return $http(request).then(function (response) {
                return response.data;
            });
        }

        function getUserByUsername(username) {
            var url = BASE_SERVICE_URL + '/Users/?filter=Username.Contains("' + username + '")';

            var request = {
                method: 'GET',
                url: url
            };

            return $http(request).then(function (response) {
                return response.data;
            });
        }
    }

} ());