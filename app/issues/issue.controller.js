(function (params) {
    'use strict';

    angular.module('issueTrackingSystem.issues')
        .controller('IssueController', IssueController);

    IssueController.$inject = ['$routeParams', '$q', 'issues', 'identity'];
    function IssueController($routeParams, $q, issues, identity) {
        var vm = this;

        vm.issue = {};
        vm.changeStatus = changeStatus;

        activate();

        function activate() {
            var promises = [getIssueById($routeParams.id), getCurrentUser()];
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

        function changeStatus() {
            //TODO
        }

    }

} ());