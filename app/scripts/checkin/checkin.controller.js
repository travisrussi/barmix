'use strict';

barMixControllers
  .controller('CheckinCtrl', function ($rootScope, $scope, $state) {
        $scope.message = 'Hello';

        $scope.clickCheckin = function() {
            $state.go('meetList');
        };

        $scope.clickBack = function () {
          $state.go('venues');
        };

  });
