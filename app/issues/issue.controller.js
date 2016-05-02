(function (params) {
    'use strict';

    angular.module('issueTrackingSystem.issues')
        .controller('IssueController', IssueController);

    IssueController.$inject = ['$routeParams', '$q', 'issues', 'identity', 'toaster'];
    function IssueController($routeParams, $q, issues, identity, toaster) {
        var vm = this;

        vm.issue = {};
        vm.comments = [];
        vm.addComment = addComment;
        vm.changeStatus = changeStatus;

        activate();

        function activate() {
            var promises = [getIssueById($routeParams.id), getCurrentUser(), getComments($routeParams.id)];
            return $q.all(promises);
        }

        function getIssueById(id) {
            return issues.getIssueById(id).then(function (data) {
                vm.issue = data;
                return vm.issue;
            });
        }

        function getCurrentUser() {
            return identity.getCurrentUser().then(function (user) {
                vm.currentUser = user;
            });
        }

        function getComments(id) {
            return issues.getComments(id).then(function (data) {
                vm.comments = data;
            });
        }

        function addComment(text) {
            var comment = { text: text };
            issues.addComment(comment, $routeParams.id).then(function (data) {
                getComments($routeParams.id);
                toaster.pop('success', 'Success', 'You successfully added a comment');
            }).catch(function (data) {
                console.error(data);
                toaster.pop('error', 'Error', data.Message);
            });
        }

        function changeStatus() {
            //TODO
        }

    }

} ());