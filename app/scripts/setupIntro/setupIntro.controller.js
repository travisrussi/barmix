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

                        $rootScope.parseUser.venueCurrent = $rootScope.parseUser.get('venueCurrent') || {};
                        $rootScope.parseUser.venueCurrent.lastCheckin = moment($rootScope.parseUser.get('venueLastCheckin'), moment.ISO_8601);
                        $rootScope.parseUser.venueCurrent.lastSeen = moment($rootScope.parseUser.get('venueLastSeen'), moment.ISO_8601);

                        if ($rootScope.parseUser.venueCurrent.id) {
                            try {
                                $rootScope.parseUser.venueCurrent.fetch().then(function (venue) {
                                    $rootScope.parseUser.venueCurrent = venue;
                                    $rootScope.parseUser.set('venueCurrent', venue);
                                    $rootScope.parseVenue = venue;
                                    $rootScope.parsePersons = venue.get('checkins') || [];


                                    $rootScope.parseUser.meetCurrent = {};
                                    $rootScope.parseUser.meetCurrent.status = $rootScope.parseUser.get('meetStatus') || 'available';
                                    $rootScope.parseUser.meetCurrent.lastPerson = $rootScope.parseUser.get('meetLastPerson') || {};
                                    $rootScope.parseUser.meetCurrent.lastSeen = $rootScope.parseUser.get('meetLastSeen') || moment().toISOString();

                                    if ($rootScope.parseUser.meetCurrent.lastPerson.id) {

                                        try {
                                            $rootScope.parseUser.meetCurrent.lastPerson.fetch().then(function (person) {
                                                $rootScope.parseUser.meetCurrent.lastPerson = person;
                                                $rootScope.parseUser.set('meetLastPerson', person);
                                                $rootScope.parseUser.set('meetLastSeen', moment().toISOString());
                                                $rootScope.parseUser.save();
                                                $rootScope.parsePerson = person;
                                                $rootScope.parsePerson.facebookUser = person.get('facebookUser');
                                                $rootScope.parsePerson.facebookPicture = person.get('facebookPicture');


                                                if ($rootScope.parseUser.meetCurrent.status === 'taken') {
                                                    $state.go('meetRate');
                                                    return;
                                                } else {
                                                    $state.go('meetAccept');
                                                    return;
                                                }
                                            });
                                        } catch (ex) {
                                            $rootScope.parseUser.set('meetLastPerson', null);
                                            $rootScope.parseUser.save();

                                            $state.go('meetList');
                                            return;
                                        }

                                    } else {
                                        $state.go('meetList');
                                        return;
                                    }
                                });
                            } catch (ex) {
                                $rootScope.parseUser.set('venueCurrent', null);
                                $rootScope.parseUser.save();

                                $state.go('venues');
                                return;
                            }

                        } else {
                            $state.go('venues');
                            return;
                        }
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
