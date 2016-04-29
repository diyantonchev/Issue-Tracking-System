(function name(params) {
    'use strict';

    angular.module('issueTrackingSystem.core')
        .factory('authentication', authentication);

    authentication.$inject = ['$http', '$q', 'BASE_SERVICE_URL'];

    function authentication($http, $q, BASE_SERVICE_URL) {

        var service = {
            register: register,
            login: login,
            isLoggedIn: isLoggedIn,
            logout: logout,
            changePassword: changePassword,
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
                        localStorage.authenticationData = JSON.stringify(response.data);
                    } else {
                        sessionStorage.authenticationData = JSON.stringify(response.data);
                    }

                    var accessToken = response.data.access_token;
                    $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;

                    return response.data;
                }).catch(function err(response) {
                    return $q.reject(response.data);
                });
        }

        function isLoggedIn() {
            var result = sessionStorage.authenticationData !== undefined ||
                localStorage.authenticationData !== undefined;

            return result;
        }

        function logout() {
            if (sessionStorage.authenticationData) {
                sessionStorage.removeItem('authenticationData');
            } else if (localStorage.authenticationData) {
                localStorage.removeItem('authenticationData');
            }

            $http.defaults.headers.common.Authorization = undefined;
        }

        function changePassword(data) {
            var url = BASE_SERVICE_URL + '/api/Account/ChangePassword';
            var request = {
                method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data
            };

            return $http(request).catch(function err(response) {
                return $q.reject(response.data);
            });
        }
    }

} ());