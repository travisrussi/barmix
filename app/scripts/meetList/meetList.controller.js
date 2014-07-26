'use strict';

barMixControllers
  .controller('MeetlistCtrl', function ($rootScope, $scope, $state, $ionicScrollDelegate) {

        $scope.clickMeet = function() {
            $rootScope.person = $scope.persons[$scope.currentPerson];

            $state.go('meetAccept');
        };

        $scope.clickPass = function() {
            $scope.currentPerson++;

            $scope.noPersons = $scope.currentPerson >= $scope.persons.length;

            if ($scope.noPersons) {
                $scope.person = null;
            } else {
                $scope.person = $scope.persons[$scope.currentPerson];
            }

            $ionicScrollDelegate.scrollTop();
        };

        $scope.clickClose = function() {
            $state.go('meetList');
        };

        $scope.persons = $rootScope.items;
        $scope.currentPerson = 0;
        if ($scope.persons.length > 0) {
            $scope.person = $scope.persons[0];
        }
        $scope.noPersons = $scope.persons.length === 0;
  });
