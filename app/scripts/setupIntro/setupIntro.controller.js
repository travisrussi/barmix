'use strict';

barMixControllers
    .controller('SetupintroCtrl', function ($scope, $state, $ionicSlideBoxDelegate) {
        $scope.message = 'Hello';

        // Called to navigate to the main app
        $scope.startApp = function () {
            $state.go('main');
        };
        $scope.next = function () {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function () {
            $ionicSlideBoxDelegate.previous();
        };

        // Called each time the slide changes
        $scope.slideChanged = function (index) {
            $scope.slideIndex = index;
        };
})
;
