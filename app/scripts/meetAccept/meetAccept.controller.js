'use strict';

barMixControllers
  .controller('MeetacceptCtrl', function ($rootScope, $scope, $state, $interval) {

        if (typeof $rootScope.parseUser === "undefined") {
            $state.go('setupIntro');
            return;
        }

        $scope.clickAccept = function() {

            $interval.cancel(intervalPromise);
            $scope.showTimer = false;
            $scope.showMeetLocation = true;

        };

        $scope.clickDecline = function() {

            $rootScope.updateMeet('available', 'declined');

            $state.go('meetList');
        };

        $scope.clickSendLocation = function() {

            $rotoScope.updateMeet('taken', 'accepted');

            $state.go('meetRate');
        };

        $scope.showTimer = true;
        $scope.expiresIn = 30;

        var intervalPromise = $interval(function () {
            $scope.expiresIn--;
            if ($scope.expiresIn <= 0) {
                $interval.cancel(intervalPromise);
            }
        }, 1000);

        $scope.showMeetLocation = false;


        $rootScope.updateMeet = function(statusCurrent, statusHistory) {
            var meetHistory = $rootScope.parseUser.get('meetHistory') || [];
            meetHistory.push({userId:$rootScope.parsePerson.id,status:statusHistory||statusCurrent,ts:moment().toISOString()});
            $rootScope.parseUser.set('meetHistory', meetHistory);

            $rootScope.parseUser.set('meetStatus', statusCurrent);
            $rootScope.parseUser.set('meetLastPerson', $rootScope.parsePerson);
            $rootScope.parseUser.set('meetLastSeen', moment().toISOString());
            $rootScope.parseUser.save();
        }

        $rootScope.updateMeet('taken', 'confirming');

  });
