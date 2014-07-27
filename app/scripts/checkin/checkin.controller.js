'use strict';

barMixControllers
  .controller('CheckinCtrl', function ($rootScope, $scope, $state) {

        if (typeof $rootScope.parseUser === "undefined") {
            $state.go('setupIntro');
            return;
        }

        var VenueObject = Parse.Object.extend("Venue");
        $rootScope.parseVenue = new VenueObject();
        var query = new Parse.Query(VenueObject);
        query.equalTo("venueId", $rootScope.venue.id);
        query.first({
            success: function(object) {
                if (typeof object === "undefined") {
                    $rootScope.updateVenue($rootScope.venue.id, $rootScope.venue.name);
                } else {
                    $rootScope.parseVenue = object;
                }
            },
            error: function(error) {
                $rootScope.updateVenue($rootScope.venue.id, $rootScope.venue.name);
            }
        });

        $rootScope.updateVenue = function(venueId, venueName) {
            $rootScope.parseVenue.set("venueId", venueId);
            $rootScope.parseVenue.set("venueName", venueName);
            $rootScope.parseVenue.save();
        };

        $rootScope.updateUserCheckin = function() {
            $rootScope.parseUser.set('venueCurrent', $rootScope.parseVenue);
            $rootScope.parseUser.set('venueLastCheckin', moment().toISOString());
            $rootScope.parseUser.set('venueLastSeen', moment().toISOString());
            $rootScope.parseUser.save();
        };

        $rootScope.addVenueCheckin = function() {
            var checkInList = $rootScope.parseVenue.get("checkins") || [];

            var bExists = false;
            var currentUserId = $rootScope.parseUser.get('id');
            for (var i = 0; i< checkInList.length; i++) {
                if (checkInList[i].get('id') === currentUserId) {
                    bExists = true;
                    break;
                }
            }

            if (!bExists) {
                checkInList.push($rootScope.parseUser)
                $rootScope.parseVenue.set("checkins", checkInList);
                $rootScope.parseVenue.save();
            }
        };


        $scope.clickCheckin = function() {
            $rootScope.addVenueCheckin();
            $rootScope.updateUserCheckin();

            $state.go('meetList');
        };

        $scope.clickBack = function () {
          $state.go('venues');
        };

  });
