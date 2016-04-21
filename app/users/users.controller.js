(function () {
    'use strict';

    angular.module('issueTrackingSystem.users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['identity'];

    function UsersController(identity) {
        var vm = this;
        
        vm.identity = identity;
    }

} ());
