(function (params) {
    'use strict';

    angular.module('issueTrackingSystem.issues')
        .controller('IssueController', IssueController);

    IssueController.$inject = ['issues', 'projects'];

    function IssueController(issues, projects) {
        var vm = this;
    }

} ());