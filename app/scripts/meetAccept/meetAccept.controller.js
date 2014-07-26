'use strict';

barMixControllers
  .controller('MeetacceptCtrl', function ($scope, $interval) {

        $scope.clickAccept = function() {

        };

        $scope.clickDecline = function() {

        };

        $scope.expiresIn = 30;

        var intervalPromise = $interval(function () {
            $scope.expiresIn--;
            if ($scope.expiresIn <= 0) {
                $interval.cancel(intervalPromise);
            }
        }, 1000);


  });
