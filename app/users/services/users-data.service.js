(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .factory('usersData', usersData);

    usersData.$inject = ['$http', 'BASE_SERVICE_URL', 'identity'];

    function usersData($http, BASE_SERVICE_URL, identity) {

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
                    'Authorization': identity.getAuthorizationHeader
                }
            };

            return $http(request).then(getUsersComplete);

            function getUsersComplete(response) {
                return response.data;
            }
        }    
    }

} ());