'use strict';

barMixControllers
    .controller('SetupintroCtrl', function ($rootScope, $scope, $state, $ionicSlideBoxDelegate) {
        $scope.message = 'Hello';

        var currentUser = Parse.User.current();

        if (typeof currentUser !== "undefined" && currentUser !== null && currentUser.fetch) {
            currentUser.fetch().then(function (currentUser) {

                if (typeof currentUser === "undefined") {
                    return;
                }

                $rootScope.parseUser = currentUser;

                $rootScope.loadFacebookUser(function() {
                    if ($rootScope.parseUser.get('setupNotify') !== true) {
                        $state.go('setupNotify');
                        return;
                    } else if ($rootScope.parseUser.get('setupCheckin') !== true) {
                        $state.go('setupCheckin');
                        return;
                    } else {
                        $state.go('venues');
                        return;
                    }
                });

            });
        }

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

        $rootScope.loadFacebookUser = function(cb) {
            if (!$rootScope.facebookUser) {
                FB.api('/me', {fields: 'id,first_name,last_name,name,birthday,gender,email,age_range'}, function (response) {
                    if (response && !response.error) {
                        $rootScope.parseUser.set('facebookUser', response);
                        $rootScope.parseUser.save();

                        FB.api('/me/picture?redirect=0&height=200&type=normal&width=200', function (response) {
                            if (response && !response.error && response.data) {
                                $rootScope.parseUser.set('facebookPicture', response.data);
                                $rootScope.parseUser.save();
                            }

                            if (cb) cb();
                        });
                    } else if (cb) {
                        cb();
                    }
                });
            } else if (cb) {
                cb();
            }
        }
})
;
