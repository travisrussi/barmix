'use strict';

barMixControllers
  .controller('LoginCtrl', function ($rootScope, $scope, $state) {
        $scope.pageTitle = 'Sign Up';

        if (typeof $rootScope.loadFacebookUser === 'undefined') {
            $state.go('setupIntro');
            return;
        }

        $scope.clickConnectWithFacebook = function() {

            Parse.FacebookUtils.logIn("public_profile,email", {
                success: function(user) {
                    if (!user.existed()) {
                        alert("User signed up and logged in through Facebook!");
                    } else {
                        alert("User logged in through Facebook!");

                    }
                    $rootScope.parseUser = user;

                    $rootScope.loadFacebookUser();

                    $state.go('setupNotify');
                },
                error: function(user, error) {
                    alert("User cancelled the Facebook login or did not fully authorize.");
                }
            });
        };
  });
