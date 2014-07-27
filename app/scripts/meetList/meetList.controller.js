'use strict';

barMixControllers
  .controller('MeetlistCtrl', function ($rootScope, $scope, $state, $timeout, $ionicScrollDelegate) {

        if (typeof $rootScope.parseUser === "undefined") {
            $state.go('setupIntro');
            return;
        }

        $scope.status = {
            personLoading: true
        }

        $scope.clickMeet = function() {
            $rootScope.person = $scope.persons[$scope.currentPerson];

            addPersonViewed($scope.person);

            $state.go('meetAccept');
        };

        $scope.clickPass = function() {
            $scope.currentPerson++;

            addPersonViewed($scope.person);

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


        function addPersonViewed(person) {
            var personViewedList = $rootScope.parseUser.get('peopleViewed') || [];
            personViewedList.push(person);
            $rootScope.parseUser.set('peopleViewed', personViewedList);
            $rootScope.parseUser.save();
        }

        $scope.persons = [];
        $scope.currentPerson = 0;

        $timeout(function() {
            var checkInList = $rootScope.parseVenue.get('checkins') || [];
            var personViewedList = $rootScope.parseUser.get('peopleViewed') || [];

            for (var i = 0; i < checkInList.length; i++){
                var checkInUser = checkInList[i];

                //if (checkInUser.get('id') !== $rootScope.parseUser.get('id')) {

                    var bAdd = personViewedList.length == 0;
                    for (var x = 0; x < personViewedList.length; x++) {
                        var personViewed = personViewedList[x];

                        if (checkInUser.get('id') !== personViewed.get('id')) {
                            bAdd = true;
                            break;
                        }
                    }
                    if (bAdd) {
                        $scope.persons.push(checkInUser);
                    }
                //}
            }

            if ($scope.persons.length > 0) {
                $scope.person = $scope.persons[0].fetch().then(function (user) {
                    $scope.person = user;
                    $scope.person.facebookUser = $scope.person.get('facebookUser');
                    $scope.person.facebookPicture = $scope.person.get('facebookPicture');
                    $scope.$digest();
                });
            }
            $scope.noPersons = $scope.persons.length === 0;
            $scope.status.personLoading = false;
        }, 10);
  });
