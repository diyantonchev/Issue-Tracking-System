(function () {
    'use strict';
    
    angular.module('issueTrackingSystem.projects')
        .controller('AddIssueController', AddIssueController);

    AddIssueController.$inject = ['issues'];

    function AddIssueController(issues) {
        var vm = this;
    }
    
} ());