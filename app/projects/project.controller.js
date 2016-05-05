(function () {
    'use strict';

    angular.module('issueTrackingSystem.projects')
        .controller('ProjectController', ProjectController);

    ProjectController.$inject = ['$q', '$routeParams', '$location', 'identity', 'projects', 'issues', 'labels', 'getAllUsersService', 'toaster'];
    function ProjectController($q, $routeParams, $location, identity, projects, issues, labels, getAllUsersService, toaster) {
        var vm = this;

        vm.issue = {
            projectId: $routeParams.id
        };

        vm.project = {};
        vm.users = getAllUsersService;
        vm.authors = [];
        vm.assignees = [];
        vm.issues = [];
        vm.tags = [];

        vm.submitEditedProject = submitEditedProject;
        vm.submitIssue = submitIssue;
        vm.addLabel = addLabel;
        vm.removeLabel = removeLabel;

        activate();
        configAutocomplete();

        function activate() {
            var promises = [getCurrentUser(), getProjectById($routeParams.id), getAvailableLabels(), getUsernames(), getProjectById($routeParams.id), getProjectIssues($routeParams.id)];
            return $q.all(promises);
        }

        function getCurrentUser() {
            return identity.getCurrentUser().then(function (user) {
                vm.currentUser = user;
            });
        }

        function getProjectById(id) {
            return projects.getProjectById(id)
                .then(function (data) {
                    vm.project = data;
                    vm.project.LeadId = data.Lead.Id;
                    return data;
                });
        }

        function getUsernames() {
            vm.usernames = [];
            vm.users.forEach(function (user) {
                vm.usernames.push(user.Username);
            });
        }

        function getProjectIssues(id) {
            return projects.getProjectIssues(id).then(function (data) {
                data.forEach(function (issue) {
                    if (issue.Author && (vm.authors.indexOf(issue.Author.Username) === -1)) {
                        vm.authors.push(issue.Author.Username);
                    }

                    if (issue.Assignee && (vm.assignees.indexOf(issue.Assignee.Username) === -1)) {
                        vm.assignees.push(issue.Assignee.Username);
                    }
                });

                vm.issues = data;
                return vm.issues;
            });
        }

        function getAvailableLabels() {
            labels.getAvailableLabels().then(function (data) {
                vm.allLabels = data;
            });
        }

        function editProject(project, id) {
            projects.editProject(project, id).then(function (response) {
                toaster.pop('success', 'Success', 'Project successfully edited');
                $location.path('/projects/' + $routeParams.id);
            }).catch(function (err) {
                toaster.pop('error', 'Error', err.Message);
            });
        }

        function submitEditedProject() {
            if (vm.labels) {
                var newLabels = convertLabelsToObjects(vm.labels);
                newLabels.forEach(function (newLabel) {
                    vm.project.Labels.push(newLabel);
                    vm.project.Labels = _.uniqBy(vm.project.Labels, 'Name');
                });

                vm.labels = '';
            }

            if (vm.newPriorities) {
                var newPriorities = convertPrioritiesToObjects(vm.newPriorities);
                newPriorities.forEach(function (newPriority) {
                    vm.project.Priorities.push(newPriority);
                    vm.project.Priorities = _.uniqBy(vm.project.Priorities, 'Name');
                });
            }

            if (vm.leadUsername) {
                var lead = vm.users.filter(function (user) {
                    return user.Username === vm.leadUsername;
                })[0];

                if (lead) {
                    vm.project.LeadId = lead.Id;
                }
            }

            editProject(vm.project, $routeParams.id);
        }

        function addIssue(issue) {
            return issues.addIssue(issue).then(function (data) {
                toaster.pop('success', 'Success', 'Issue successfully added');
                $location.path('/projects/' + $routeParams.id);
            }).catch(function () {
                toaster.pop('error', 'Error', 'Chosen Assigne does not exists. Please choose Assignee from the list provided!');
            });
        }

        function submitIssue(data) {
            if (vm.labels) {
                vm.issue.labels = convertLabelsToObjects(vm.labels);
                vm.labels = '';
            }

            if (vm.assigneeUsername) {
                var assignee = vm.users.filter(function (user) {
                    return user.Username === vm.assigneeUsername;
                })[0];

                if (assignee) {
                    vm.issue.AssigneeId = assignee.Id;
                }
            }

            addIssue(vm.issue);
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