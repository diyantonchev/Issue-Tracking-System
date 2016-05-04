(function () {
    'use strict';

    angular.module('issueTrackingSystem.core')
        .factory('issues', issues);

    issues.$inject = ['$http', '$q', 'BASE_SERVICE_URL'];

    function issues($http, $q, BASE_SERVICE_URL) {
        var service = {
            addIssue: addIssue,
            getIssueById: getIssueById,
            getUserIssues: getUserIssues,
            editIssue: editIssue,
            changeStatus: changeStatus,
            getComments: getComments,
            addComment: addComment
        };

        return service;

        function addIssue(data) {
            var url = BASE_SERVICE_URL + '/issues';
            var request = {
                method: 'POST',
                url: url,
                data: data
            };

            return $http(request).then(function (response) {
                return response.data;
            }).catch(function err(response) {
                return $q.reject(response.data);
            });
        }

        function getIssueById(id) {
            var url = BASE_SERVICE_URL + '/issues/' + id;
            return $http.get(url).then(function (response) {
                return response.data;
            }).catch(function err(response) {
                return $q.reject(response.data);
            });
        }

        function getUserIssues(params) {
            var url = BASE_SERVICE_URL + '/issues/me?orderBy=DueDate desc';
            var request = {
                method: 'GET',
                url: url,
                params: params
            };

            return $http(request).then(function (response) {
                return response.data;
            }).catch(function err(response) {
                return $q.reject(response.data);
            });
        }

        function editIssue(data, id) {
            var url = BASE_SERVICE_URL + '/issues/' + id;
            var request = {
                method: 'PUT',
                url: url,
                data: data
            };

            return $http(request).then(function (response) {
                return response.data;
            }).catch(function err(response) {
                return $q.reject(response.data);
            });
        }

        function changeStatus(issueId, statusId) {
            var url = BASE_SERVICE_URL + '/issues/' + issueId + '/changestatus?statusid=' + statusId;
            return $http.put(url).then(function (response) {
                return response.data;
            }).catch(function err(response) {
                return $q.reject(response.data);
            });
        }

        function getComments(id) {
            var url = BASE_SERVICE_URL + '/issues/' + id + '/comments/';
            return $http.get(url).then(function (response) {
                return response.data;
            }).catch(function err(response) {
                return $q.reject(response.data);
            });
        }

        function addComment(comment, id) {
            var url = BASE_SERVICE_URL + '/issues/' + id + '/comments/';
            var request = {
                method: 'POST',
                url: url,
                data: comment
            };

            return $http(request).then(function (response) {
                return response.data;
            }).catch(function err(response) {
                return $q.reject(response.data);
            });
        }
    }

} ());