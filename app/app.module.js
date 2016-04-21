(function () {
    'use strict';

    angular.module('issueTrackingSystem', [
        'ngRoute',
        'issueTrackingSystem.layout',
        'issueTrackingSystem.users',
    ])
        .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
        
} ());