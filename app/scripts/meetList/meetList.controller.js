'use strict';

barMixControllers
  .controller('MeetlistCtrl', function ($rootScope, $scope, $state, $timeout, $ionicScrollDelegate) {

        if (!$rootScope.parseUser) {
            $state.go('setupIntro');
            return;
        }

        $scope.status = {
            personLoading: true
        }

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

        $scope.persons = [];
        $scope.currentPerson = 0;

        var checkInList = $rootScope.parseVenue.get('checkins') || [];
        var personViewedList = $rootScope.parseUser.get('peopleViewed') || [];
        
        for (var i = 0; i < checkInList.length; i++){
            var checkInUser = checkInList[i];

            //if (checkInUser.get('id') !== $rootScope.parseUser.get('id')) {

                var bAdd = personViewedList.length == 0;
                for (var x = 0; x < personViewedList.length; x++) {
                    var personViewed = personViewedList[x];

                    //if (personViewed.get('id') !== $rootScope.parseUser.get('id') && checkInUser.get('id') !== personViewed.get('id')) {
                        bAdd = true;
                    //    break;
                    //}
                }
                if (bAdd) {
                    $scope.persons.push(checkInUser);
                }
            //}
        }

        if ($scope.persons.length > 0) {
            $scope.person = $scope.persons[0].fetch();
        }
        $scope.noPersons = $scope.persons.length === 0;
        $scope.status.personLoading = false;

  });
