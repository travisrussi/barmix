'use strict';

barMixControllers
  .controller('MeetrateCtrl', function ($scope, $state) {
    $scope.message = 'Hello';

        $scope.clickRate = function() {
            $state.go('meetList');
        }
  });
