(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .factory('users', users);

    users.$inject = ['$http', 'BASE_SERVICE_URL'];

    function users($http, BASE_SERVICE_URL) {

        var service = {
            getUsers: getUsers,
            makeAdmin: makeAdmin,
            changePassword: changePassword
        };

        return service;

        function getUsers(authorizationHeader) {
            var url = BASE_SERVICE_URL + '/users/';

            var request = {
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorizationHeader
                }
            };

            return $http(request).then(getUsersComplete);

            function getUsersComplete(response) {
                return response.data;
            }
        }

        function makeAdmin() {

        }

        function changePassword() {

        }
    }

} ());