(function name(params) {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .factory('authentication', authentication);

    authentication.$inject = ['$http', '$q', 'identity', 'BASE_SERVICE_URL'];

    function authentication($http, $q, identity, BASE_SERVICE_URL) {
        var service = {
            register: register,
            login: login,
            isLoggedIn: isLoggedIn,
            logout: logout,
            changePassword: changePassword,
            makeAdmin: makeAdmin
        };

        return service;

        function register(userData, savePassword) {
            var registerUrl = BASE_SERVICE_URL + '/api/Account/Register/';

            var request = {
                method: 'POST',
                url: registerUrl,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: userData
            };

            return $http(request)
                .then(function (response) {
                    login(userData, savePassword);
                    return response.data;
                }).catch(function err(response) {
                    return $q.reject(response.data);
                });
        }

        function login(userData, keepMeLogin) {
            var loginData = 'Username=' + userData.email +
                '&Password=' + userData.password + '&grant_type=password';
            var request = {
                method: 'POST',
                url: BASE_SERVICE_URL + '/api/Token',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: loginData,
            };

            return $http(request)
                .then(function (response) {
                    if (keepMeLogin) {
                        localStorage.currentUser = JSON.stringify(response.data);
                    } else {
                        sessionStorage.currentUser = JSON.stringify(response.data);
                    }

                    return response;
                }).catch(function err(response) {
                    return $q.reject(response.data);
                });
        }

        function isLoggedIn() {
            return sessionStorage.currentUser !== undefined ||
                localStorage.currentUser !== undefined;
        }

        function logout() {
            if (sessionStorage.currentUser) {
                delete sessionStorage.currentUser;
            } else if (localStorage.currentUser) {
                delete localStorage.currentUser;
            }
        }

        function changePassword(data) {
            var url = BASE_SERVICE_URL + '/api/Account/ChangePassword';
            var request = {
                method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': identity.getAuthorizationHeader
                },
                data: data
            };

            return $http(request);
        }

        function makeAdmin(user) {
            var url = BASE_SERVICE_URL + '/users/makeadmin';
            var request = {
                method: 'PUT',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': identity.getAuthorizationHeader
                },
                data: user
            };

            return $http(request);
        }
    }

} ());