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
                    $rootScope.parseVenue.set("venueId", $rootScope.venue.id);
                    $rootScope.parseVenue.set("venueName", $rootScope.venue.name);
                    $rootScope.parseVenue.save();
                } else {
                    $rootScope.parseVenue = object;
                }
            },
            error: function(error) {
                $rootScope.parseVenue.set("venueId", $rootScope.venue.id);
                $rootScope.parseVenue.set("venueName", $rootScope.venue.name);
                $rootScope.parseVenue.save();
            }
        });


        $scope.clickCheckin = function() {
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

            $state.go('meetList');
        };

        $scope.clickBack = function () {
          $state.go('venues');
        };

  });
