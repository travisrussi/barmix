'use strict';

barmixApp
  .config(function ($stateProvider) {
    $stateProvider
      .state('venues', {
        url: '/venues',
        templateUrl: 'templates/venues.html',
        controller: 'VenuesCtrl'
      });
  });