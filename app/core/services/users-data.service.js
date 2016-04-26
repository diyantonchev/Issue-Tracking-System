(function () {
    'use strict';

    angular.module('issueTrackingSystem.core')
        .factory('usersData', usersData);

    usersData.$inject = ['$http', 'BASE_SERVICE_URL'];

    function usersData($http, BASE_SERVICE_URL) {

        var service = {
            getUsers: getUsers,
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

            return $http(request).then(getUsersComplete);

            function getUsersComplete(response) {
                return response.data;
            }
        }
    }

} ());