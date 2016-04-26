(function () {
    'use strict';

    angular.module('issueTrackingSystem', [
        'ngRoute',
        'ngCookies',
        'angular-loading-bar',
        'ui.bootstrap.pagination',
        'issueTrackingSystem.layout',
        'issueTrackingSystem.users',
        'issueTrackingSystem.projects',
        'issueTrackingSystem.issues'
    ])
        .constant('BASE_SERVICE_URL', 'http://softuni-issue-tracker.azurewebsites.net');

} ());