(function () {
    'use strict';

    angular.module('issueTrackingSystem.projects')
        .directive('addLabel', addLabel);

    function addLabel() {
        var directive = {
            restrict: 'EA',
            link: link,
            controller: 'ProjectController',
            controllerAs: vm
        };

        return directive;


        function link(scope, element) {
            element.on('click', function (event) {
                
            });
        }
    }

} ());