(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .factory('identity', identity);

    identity.$inject = ['$http', '$q', 'BASE_SERVICE_URL'];

    function identity($http, $q, BASE_SERVICE_URL) {

        var service = {
            register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn
        };

        return service;

        function register(userData, success, error) {
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
                .then(success, error)
                .catch(function (err) {
                    return $q.reject(err);
                });
        }

        function login(userData, keepMeLogin, success, error) {
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
                    success(response);
                    if (keepMeLogin) {
                        localStorage.currentUser = JSON.stringify(response.data);
                    } else {
                        sessionStorage.currentUser = JSON.stringify(response.data);
                    }
                })
                .catch(function (err) {
                    return $q.reject(err);
                });
        }

        function logout() {
            if (sessionStorage.currentUser) {
                delete sessionStorage.currentUser;
            } else if (localStorage.currentUser) {
                delete localStorage.currentUser;
            }
        }

        function isLoggedIn() {
            return sessionStorage.currentUser !== undefined ||
                localStorage.currentUser !== undefined;
        }

    }

} ());