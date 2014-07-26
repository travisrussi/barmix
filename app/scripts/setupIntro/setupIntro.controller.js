'use strict';

barMixControllers
    .controller('SetupintroCtrl', function ($scope, $state, $ionicSlideBoxDelegate) {
        $scope.message = 'Hello';

        // Called to navigate to the main app
        $scope.clickSkipIntro = function () {
            $state.go('login');
        };
        $scope.clickStart = function () {
            $state.go('login');
        };
        $scope.clickNext = function () {
            $ionicSlideBoxDelegate.next();
        };
        $scope.clickBack = function () {
            $ionicSlideBoxDelegate.previous();
        };

        // Called each time the slide changes
        $scope.slideChanged = function (index) {
            $scope.slideIndex = index;
        };
})
;
