(function name(params) {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .factory('authentication', authentication);

    authentication.$inject = ['$http', 'BASE_SERVICE_URL'];

    function authentication($http, BASE_SERVICE_URL) {
        var service = {
            register: register,
            login: login,
            logout: logout,
        };

        return service;

        function register(userData, savePassword, success, error) {
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
                    login(userData, savePassword, success, error);
                })
                .catch(error);
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
                .catch(error);
        }

        function logout() {
            if (sessionStorage.currentUser) {
                delete sessionStorage.currentUser;
            } else if (localStorage.currentUser) {
                delete localStorage.currentUser;
            }
        }
    }

} ());