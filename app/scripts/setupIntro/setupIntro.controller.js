'use strict';

barMixControllers
    .controller('SetupintroCtrl', function ($rootScope, $scope, $state, $ionicSlideBoxDelegate) {

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

        $rootScope.loadUser = function(user, cb) {
            if (typeof user !== "undefined" && user !== null && user.fetch) {

                user.fetch().then(function (user) {

                    user.venueCurrent = user.get('venueCurrent') || {};
                    user.venueCurrent.lastCheckin = moment(user.get('venueLastCheckin'), moment.ISO_8601);
                    user.venueCurrent.lastSeen = moment(user.get('venueLastSeen'), moment.ISO_8601);

                    user.facebookUser = user.get('facebookUser');
                    user.facebookPicture = user.get('facebookPicture');

                    if (user.venueCurrent.id) {
                        try {
                            user.venueCurrent.fetch().then(function (venue) {
                                user.venueCurrent = venue;
                                user.set('venueCurrent', venue);
                                $rootScope.parseVenue = venue;
                                $rootScope.parsePersons = venue.get('checkins') || [];

                                var bUserCheckedIntoVenue = false;
                                for (var i = 0; i < $rootScope.parsePersons.length; i++) {
                                    if ($rootScope.parsePersons[i].id === user.id) {
                                        bUserCheckedIntoVenue = true;
                                        break;
                                    }
                                }

                                if (!bUserCheckedIntoVenue) {
                                    $rootScope.parsePersons.push(user);
                                    $rootScope.parseVenue.set('checkins', $rootScope.parsePersons);
                                    $rootScope.parseVenue.save();
                                }


                                user.meetCurrent = {};
                                user.meetCurrent.status = user.get('meetStatus') || 'available';
                                user.meetCurrent.lastPerson = user.get('meetLastPerson') || {};
                                user.meetCurrent.lastSeen = user.get('meetLastSeen') || moment().toISOString();

                                if (user.meetCurrent.lastPerson.id) {

                                    try {
                                        user.meetCurrent.lastPerson.fetch().then(function (person) {
                                            user.meetCurrent.lastPerson = person;
                                            user.set('meetLastPerson', person);
                                            user.set('meetLastSeen', moment().toISOString());
                                            user.save();
                                            $rootScope.parsePerson = person;
                                            $rootScope.parsePerson.facebookUser = person.get('facebookUser');
                                            $rootScope.parsePerson.facebookPicture = person.get('facebookPicture');


                                            if (cb) return cb(user);
                                            return;
                                        });
                                    } catch (ex) {
                                        user.set('meetLastPerson', null);
                                        user.save();

                                        if (cb) return cb(user);
                                        return;
                                    }

                                } else {
                                    if (cb) return cb(user);
                                    return;
                                }
                            });
                        } catch (ex) {
                            user.set('venueCurrent', null);
                            user.save();

                            if (cb) return cb(user);
                            return;
                        }

                    } else {
                        if (cb) return cb(user);
                        return;
                    }
                });
            }
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

        var currentUser = Parse.User.current();
        $rootScope.loadUser(currentUser, function(p) {

            if (typeof p === "undefined") {
                return;
            }

            $rootScope.parseUser = p;

            if ($rootScope.parseUser.get('setupNotify') !== true) {
                $state.go('setupNotify');
                return;
            } else if ($rootScope.parseUser.get('setupCheckin') !== true) {
                $state.go('setupCheckin');
                return;
            } else {

                if ($rootScope.parseUser.meetCurrent.status === 'taken') {
                    $state.go('meetRate');
                    return;
                } else if (typeof $rootScope.parseUser.meetCurrent.lastPerson !== 'undefined' && typeof $rootScope.parseUser.meetCurrent.lastPerson.id !== 'undefined') {
                    $state.go('meetAccept');
                    return;
                } else if (typeof $rootScope.parseUser.venueCurrent.id !== 'undefined') {
                    $state.go('meetList');
                    return;
                } else {
                    $state.go('venues');
                    return;
                }

            }

        });
})
;
