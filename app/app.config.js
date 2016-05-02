(function () {
    'use strict';

    angular.module('issueTrackingSystem')
        .config(config)
        .run(authenticationCheck)
        .run(authorization);

    config.$inject = ['$routeProvider', '$httpProvider'];
    function config($routeProvider, $httpProvider) {

        $routeProvider.otherwise({ redirectTo: '/' });

        $httpProvider.interceptors.push(interceptor);
    }

    authenticationCheck.$inject = ['$rootScope', '$location'];
    function authenticationCheck($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            if (rejection == 'Unauthorized Access') {
                $location.path('#/');
            }
        });
    }

    authorization.$inject = ['$http', '$location', 'authentication'];
    function authorization($http, $location, authentication) {
        if (authentication.isLoggedIn()) {
            var accessToken;
            if (sessionStorage.authenticationData) {
                accessToken = JSON.parse(sessionStorage.authenticationData).access_token;
            } else if (localStorage.authenticationData) {
                accessToken = JSON.parse(localStorage.authenticationData).access_token;
            }

            $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
        }
    }

    interceptor.$inject = ['$q', 'toaster'];
    function interceptor($q, toaster) {
        return {
            'responseError': function (rejection) {
                if (rejection.data && rejection.data.error_description) {
                    toaster.pop('error', 'Error', rejection.data.error_description);
                } else if (rejection.data && rejection.data.ModelState && rejection.data.ModelState['']) {
                    var errors = rejection.data.ModelState[''];
                    if (errors.length > 0) {
                        toaster.pop('error', 'Error', errors[0]);
                    }
                }

                return $q.reject(rejection);
            }
        };
    }

} ());