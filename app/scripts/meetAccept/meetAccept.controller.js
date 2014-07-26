'use strict';

barMixControllers
  .controller('MeetacceptCtrl', function ($scope, $interval) {

        $scope.clickAccept = function() {

            $interval.cancel(intervalPromise);
            $scope.showTimer = false;
            $scope.showMeetLocation = true;

        };

        $scope.clickDecline = function() {

        };

        $scope.clickSendLocation = function() {

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
