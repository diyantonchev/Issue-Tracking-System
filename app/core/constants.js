(function () {
    'use strict';

    angular.module('issueTrackingSystem.core')
        .constant('BASE_SERVICE_URL', 'http://softuni-issue-tracker.azurewebsites.net')
        .constant('PAGE_SIZE', 4);

} ());