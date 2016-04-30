(function () {
    'use strict';

    angular.module('issueTrackingSystem.core')
        .factory('identity', identity);

    identity.$inject = ['$http', '$q', 'BASE_SERVICE_URL'];

    function identity($http, $q, BASE_SERVICE_URL) {

        var service = {
            isLoggedIn: isLoggedIn,
            requestUserProfile: requestUserProfile,
            getCurrentUser: getCurrentUser,
            makeAdmin: makeAdmin
        };

        return service;

        function isLoggedIn() {
            var result = sessionStorage.authenticationData !== undefined ||
                localStorage.authenticationData !== undefined;

            return result;
        }

        function requestUserProfile() {
            var url = BASE_SERVICE_URL + '/users/me';

            var request = {
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            return $http(request).then(function (response) {
                return response.data;
            }).catch(function err(response) {
                return $q.reject(response.data);
            });

        }

        function getCurrentUser() {
            if (isLoggedIn()) {
                return requestUserProfile().then(function (user) {
                    return user;
                });
            } else {
                return $q.reject(undefined);
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

            return $http(request).catch(function err(response) {
                return $q.reject(response.data);
            });
        }
    }

} ());