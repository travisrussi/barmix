'use strict';

barMixControllers
  .controller('SetupnotifyCtrl', function ($scope, $state, $timeout) {

    $scope.clickSave = function() {
        $state.go('setupCheckin');
    };

  });
