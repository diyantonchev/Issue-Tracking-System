(function () {
    'use strict';

    angular.module('issueTrackingSystem.core')
        .directive('autocompleteUsers', autocompleteUsers);

    function autocompleteUsers() {
        var directive = {
            restrict: 'EA',
            link: link,
        };

        return directive;

        function link(scope, element) {
            element.on('keyup', function (event) {
                var users = [];
                scope.vm.users.forEach(function (user) {
                    users.push(user.Username);
                });

                element.autocomplete({
                    source: users
                });
                
            });
        }
    }

} ());