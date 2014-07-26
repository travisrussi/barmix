'use strict';

barMixControllers
  .config(function ($stateProvider) {
    $stateProvider
      .state('splash', {
        url: '/splash',
        templateUrl: 'templates/splash.html',
        controller: 'SplashCtrl'
      });
  });