'use strict';

barMixControllers
  .controller('SetupcheckinCtrl', function ($rootScope, $scope, $state) {

        $scope.setup = {};
        $scope.notSupported = false;

        if (!$rootScope.parseUser) {
            $state.go('login');
        }//  else if ($rootScope.parseUser.get('setupCheckin') === true) {
        //    $state.go('venues');
        //}

        $scope.clickSave = function() {
            doGeoLocation();
        };



        function success(position) {

            $rootScope.parseUser.set("setupCheckin", true);
            $rootScope.parseUser.set("positionLat", position.coords.latitude);
            $rootScope.parseUser.set("positionLong", position.coords.longitude);

            $rootScope.parseUser.save();

            $state.go('venues');
        }

        function error(msg) {
            alert('Error: ' + JSON.stringify(msg));
        }

        function doGeoLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
            } else {
                $scope.notSupported = true;
            }
        }
  });
