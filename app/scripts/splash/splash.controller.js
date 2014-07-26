'use strict';

barMixControllers
  .controller('SplashCtrl', function ($scope, $state, $timeout) {
    $scope.message = 'Splash';

        $timeout(function() {
            $state.go('setupIntro');
        }, 1000);
  });
