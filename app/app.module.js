(function () {
    'use strict';

    angular.module('issueTrackingSystem', [
        'ngRoute',
        'ngResource',
        'ngSanitize',
        'angular-loading-bar',
        'ui.bootstrap.pagination',
        'issueTrackingSystem.layout',
        'issueTrackingSystem.users',
    ])
        .constant('BASE_SERVICE_URL', 'http://softuni-issue-tracker.azurewebsites.net');

} ());