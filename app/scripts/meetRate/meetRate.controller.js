'use strict';

barMixControllers
  .controller('MeetrateCtrl', function ($rootScope, $scope, $state) {

        if (typeof $rootScope.parseUser === "undefined") {
            $state.go('setupIntro');
            return;
        }

        $scope.clickRate = function() {
            $state.go('meetList');
        }
  });
