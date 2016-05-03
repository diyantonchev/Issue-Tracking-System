(function () {
    'use strict';

    angular.module('issueTrackingSystem.core')
        .directive('autocompleteLabels', autocompleteLabels);

    function autocompleteLabels() {
        var directive = {
            restrict: 'EA',
            link: link
        };

        return directive;

        function link(scope, element) {
            element.on('keyup', function (event) {
                var labels = [];
                scope.vm.allLabels.forEach(function (label) {
                    labels.push(label.Name);
                });

                element.autocomplete({
                    source: labels
                });

            });
        }
    }

} ());