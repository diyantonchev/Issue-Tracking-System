(function () {
    'use strict';

    angular.module('issueTrackingSystem.core')
        .factory('issues', issues);

    issues.$inject = ['$http', '$q', 'BASE_SERVICE_URL'];

    function issues($http, $q, BASE_SERVICE_URL) {
        var service = {
            getUserIssues: getUserIssues,
            addIssue: addIssue
        };

        return service;

        function getUserIssues(params) {
            var request = {
                method: 'GET',
                url: BASE_SERVICE_URL + '/issues/me?orderBy=DueDate desc',
                params: params
            };

            return $http(request).then(function (response) {
                return response.data;
            }).catch(function err(response) {
                return $q.reject(response.data);
            });
        }

        function addIssue(data) {
            var request = {
                method: 'POST',
                url: BASE_SERVICE_URL + '/issues',
                data: data
            };

            return $http(request).then(function (response) {
                return response.data;
            }).catch(function err(response) {
                return $q.reject(response.data);
            });
        }
    }

} ());