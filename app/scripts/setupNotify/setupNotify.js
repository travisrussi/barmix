'use strict';

barmixApp
  .config(function ($stateProvider) {
    $stateProvider
      .state('setupNotify', {
        url: '/setupNotify',
        templateUrl: 'templates/setupNotify.html',
        controller: 'SetupnotifyCtrl'
      });
  });