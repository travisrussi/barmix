'use strict';

barMixControllers
  .controller('SetupcheckinCtrl', function ($scope, $state) {

        $scope.clickSave = function() {
            $state.go('venues');
        };
  });
