'use strict';

barMixControllers
  .controller('SetupnotifyCtrl', function ($rootScope, $scope, $state, $timeout) {

    $scope.setup = {};

    if (!$rootScope.parseUser) {
        $state.go('login');
    }

    $scope.clickSave = function() {

        $rootScope.parseUser.set("setupNotify", true);
        $rootScope.parseUser.set("mobileNumber", $scope.setup.notificationNumber);

        $rootScope.parseUser.save(null, {
            success: function (user) {
                // Execute any logic that should take place after the object is saved.
                alert('New object created with objectId: ' + user.id);
            },
            error: function (user, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and description.
                alert('Failed to create new object, with error code: ' + error.message);
            }
        });

        $state.go('setupCheckin');
    };


        $scope.phoneNumberPattern = (function() {
            var regexp = /^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/;
            return {
                test: function(value) {
                    if( $scope.requireTel === false ) return true;
                    else return regexp.test(value);
                }
            };
        })();

  });
