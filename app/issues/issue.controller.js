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
                getProjectById(vm.issue.Project.Id).then(function () {
                    canComment(vm.currentUser, vm.issue, vm.project);
                });
            });
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

        function canComment(currentUser, issue, project) {
            projects.getProjectIssues(project.Id).then(function (projectIssues) {
                var userIssues = projectIssues.filter(function (issue) {
                    return issue.Assignee.Id === currentUser.Id;
                });

                var isIssueAssignee = currentUser.Id === issue.Assignee.Id;
                var isProjectLead = currentUser.Id === project.Lead.Id;
                var hasAssignedIssue = userIssues.length > 0;
                var isAdmin = currentUser.isAdmin;

                if (isIssueAssignee || isProjectLead || hasAssignedIssue || isAdmin) {
                    vm.userCanComment = true;

                } else {
                    vm.userCanComment = false;
                }

                return vm.userCanComment;
            });
        }

        function addComment(text) {
            var comment = { text: text };
            vm.text = '';
            issues.addComment(comment, $routeParams.id).then(function (data) {
                getComments($routeParams.id);
                toaster.pop('success', 'Success', 'You successfully added a comment');
            }).catch(function (data) {
                console.error(data);
                toaster.pop('error', 'Error', data.Message);
            });
        }

        function getProjectById(id) {
            return projects.getProjectById(id).then(function (data) {
                vm.project = data;
                return vm.project;
            });
        }

        function changeStatus(statusId) {
            return issues.changeStatus(vm.issue.Id, statusId).then(function (data) {
                activate();
                toaster.pop('info', 'Status Change', 'Status has been change');
            });
        }

    }

} ());