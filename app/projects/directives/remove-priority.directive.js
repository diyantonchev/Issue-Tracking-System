(function () {
    'use strict';

    angular.module('issueTrackingSystem.projects')
        .directive('removePriority', removePriority);

    function removePriority() {
        var directive = {
            restrict: 'EA',
            link: link,
            controller: 'ProjectController',
            controllerAs: 'vm',
        };

        return directive;


        function link(scope, element) {
            element.on('click', function (event) {
                var input = this.previousElementSibling;
                var priorityForRemove = input.value;
                var priorities = scope.$parent.project.Priorities;
                scope.$parent.project.Priorities = priorities.filter(function (priority) {
                    return priority.Name !== priorityForRemove;
                });

                this.parentElement.removeChild(input);
                this.parentElement.removeChild(this);
            });
        }
    }

} ());