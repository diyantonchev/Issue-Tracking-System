(function () {
    'use strict';

    angular.module('issueTrackingSystem.core')
        .factory('labels', labels);

    labels.$inject = ['$http', 'BASE_SERVICE_URL'];

    function labels($http, BASE_SERVICE_URL) {

        var service = {
            getAvailableLabels: getAvailableLabels
        };

        return service;

        function getAvailableLabels() {
            var request = {
                method: 'GET',
                url: BASE_SERVICE_URL + '/labels/?filter=',
            };

            return $http(request).then(function (response) {
                return response.data;
            });
        }

    }

} ());