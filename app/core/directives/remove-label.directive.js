(function () {
    'use strict';

    angular.module('issueTrackingSystem.core')
        .directive('removeLabel', removeLabel);

    function removeLabel() {
        var directive = {
            restrict: 'EA',
            link: link,
        };

        return directive;

        function link(scope, element, atrs, controller) {
            element.on('click', function (event) {
                var input = this.previousElementSibling;
                var labelForRemove = input.value;

                if (scope.vm.project) {
                    scope.vm.project.Labels = scope.vm.project.Labels.filter(function (label) {
                        return label.Name !== labelForRemove;
                    });
                } else {                 
                    scope.$parent.vm.labels = scope.$parent.vm.labels.filter(function (label) {
                        return label.Name !== labelForRemove;
                    });
                }


                this.parentElement.removeChild(input);
                this.parentElement.removeChild(this);
            });
        }
    }

} ());