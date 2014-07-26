'use strict';

barmixApp
  .config(function ($stateProvider) {
    $stateProvider
      .state('setupIntro', {
        url: '/setupIntro',
        templateUrl: 'templates/setupIntro.html',
        controller: 'SetupintroCtrl'
      });
  });