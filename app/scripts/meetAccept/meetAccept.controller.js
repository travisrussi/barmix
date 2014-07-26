'use strict';

barMixControllers
  .controller('MeetacceptCtrl', function ($scope, $state, $interval) {

        $scope.clickAccept = function() {

            $interval.cancel(intervalPromise);
            $scope.showTimer = false;
            $scope.showMeetLocation = true;

        };

        $scope.clickDecline = function() {
            $state.go('meetList');
        };

        $scope.clickSendLocation = function() {
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

  });
