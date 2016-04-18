(function () {
    'use strict';

    angular.module('issueTrackingSystem', [
        'ngRoute',
        'issueTrackingSystem.home'
    ])
        .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
        
} ());