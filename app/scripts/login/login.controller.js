'use strict';

barMixControllers
  .controller('LoginCtrl', function ($scope, $state) {
    $scope.pageTitle = 'Sign Up';

        $scope.clickConnectWithFacebook = function() {
            $state.go('setupNotify');
        };
  });
