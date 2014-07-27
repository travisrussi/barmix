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
            $rootScope.parsePerson = $rootScope.parsePersons[$scope.currentPerson];

            addPersonViewed($rootScope.parsePerson);

            $state.go('meetAccept');
        };

        $scope.clickPass = function() {
            $scope.currentPerson++;

            addPersonViewed($rootScope.parsePerson);

            $scope.noPersons = $scope.currentPerson >= $rootScope.parsePersons.length;

            if ($scope.noPersons) {
                $rootScope.parsePerson = null;
            } else {
                $rootScope.parsePerson = $rootScope.parsePersons[$scope.currentPerson];
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

        $rootScope.parsePersons = [];
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

                        //if (checkInUser.get('id') !== personViewed.get('id')) {
                            bAdd = true;
                        //    break;
                        //}
                    }
                    if (bAdd) {
                        $rootScope.parsePersons.push(checkInUser);
                    }
                //}
            }

            if ($rootScope.parsePersons.length > 0) {
                $rootScope.parsePerson = $rootScope.parsePersons[0].fetch().then(function (user) {
                    $rootScope.parsePerson = user;
                    $rootScope.parsePerson.facebookUser = $rootScope.parsePerson.get('facebookUser');
                    $rootScope.parsePerson.facebookPicture = $rootScope.parsePerson.get('facebookPicture');
                    $scope.$digest();
                });
            }
            $scope.noPersons = $rootScope.parsePersons.length === 0;
            $scope.status.personLoading = false;
        }, 10);
  });
