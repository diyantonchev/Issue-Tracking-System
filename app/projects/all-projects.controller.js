(function () {
    'use strict';

    angular.module('issueTrackingSystem.projects')
        .controller('AllProjectsController', AllProjectsController);

    AllProjectsController.$inject = ['$q', 'projects', 'getAllPojectsService', 'getAllUsersService', 'labels', 'toaster'];
    function AllProjectsController($q, projects, getAllPojectsService, getAllUsersService, labels, toaster) {
        var vm = this;

        vm.projects = getAllPojectsService;
        vm.users = getAllUsersService;

        vm.addLabel = addLabel;
        vm.removeLabel = removeLabel;
        vm.tags = [];
        vm.submitProject = submitProject;

        activate();
        configAutocomplete();

        function activate() {
            var promises = [getAvailableLabels(), getUsernames()];
            return $q.all(promises);
        }

        function addProject(newProject) {
            return projects.addProject(newProject).then(function (data) {
                toaster.pop('success', 'Success', 'Project successfully added');
            }).catch(function (err) {
                console.log(err);
                toaster.pop('error','Error', err.Message);
            });
        }

        function submitProject() {
            if (vm.labels) {
                vm.newProject.Labels = convertLabelsToObjects(vm.labels);
            }

            if (vm.priorities) {
                vm.newProject.Priorities = convertPrioritiesToObjects(vm.priorities);
            }

            if (vm.LeadId) {
                var lead = vm.users.filter(function (user) {
                    return user.Username === vm.LeadId;
                })[0];

                if (lead) {
                    vm.newProject.LeadId = lead.Id;
                }
            }

            addProject(vm.newProject);
        }

        function getUsernames() {
            vm.usernames = [];
            vm.users.forEach(function (user) {
                vm.usernames.push(user.Username);
            });
        }

        function getAvailableLabels() {
            labels.getAvailableLabels().then(function (data) {
                vm.allLabels = data;
            });
        }

        function addLabel(newLabel) {
            if (newLabel !== '' && vm.tags.indexOf(newLabel) === -1) {
                vm.tags.push($('#labels').val());
                vm.labels = vm.tags.join();
            }

            vm.newLabel = '';
        }

        function removeLabel(index) {
            vm.tags.splice(index, 1);
            vm.labels = vm.tags.join();
        }

        function convertLabelsToObjects(labels) {
            var labelObjects = [];
            var labelNames = labels.split(',');
            labelNames.forEach(function (name, index) {
                labelObjects[index] = { Name: name };
            });

            return labelObjects;
        }

        function convertPrioritiesToObjects(priorities) {
            var prioritiesObjects = [];
            var priorityNames = priorities.split(/\W+/);
            priorityNames.forEach(function (name, index) {
                prioritiesObjects[index] = { Name: name };
            });

            return prioritiesObjects;
        }
        
         function configAutocomplete() {
            vm.usersAutocomplete = {
                options: {
                    onlySelect: true,
                    source: function (request, response) {
                        var data = vm.usernames;
                        data = vm.usersAutocomplete.methods.filter(data, request.term);

                        if (!data.length) {
                            data.push({
                                label: 'not found',
                                value: ''
                            });
                        }
                        response(data);
                    },
                }
            };
        }
    }

} ());