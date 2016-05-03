(function (params) {
    'use strict';

    angular.module('issueTrackingSystem.issues')
        .controller('IssueController', IssueController);

    IssueController.$inject = ['$routeParams', '$q', 'issues', 'identity', 'projects', 'toaster'];
    function IssueController($routeParams, $q, issues, identity, projects, toaster) {
        var vm = this;

        vm.issue = {};
        vm.project = {};
        vm.comments = [];
        vm.addComment = addComment;
        vm.changeStatus = changeStatus;

        activate();

        function activate() {
            var promises = [getIssueById($routeParams.id), getCurrentUser(), getComments($routeParams.id)];
            return $q.all(promises).then(function () {
                    getProjectById(vm.issue.Project.Id);
            });
        }

        function getIssueById(id) {
            return issues.getIssueById(id).then(function (data) {
                vm.issue = data;
                console.log(data);
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
            vm.text = '';
            issues.addComment(comment, $routeParams.id).then(function (data) {
                getComments($routeParams.id);
                toaster.pop('success', 'Success', 'You successfully added a comment');
            }).catch(function (data) {
                toaster.pop('error', 'Error', data.Message);
            });
        }

        function getProjectById(id) {
            return projects.getProjectById(id).then(function (data) {
                vm.project = data;
                return vm.project;
            });
        }

        function changeStatus() {
            //TODO
        }

    }

} ());