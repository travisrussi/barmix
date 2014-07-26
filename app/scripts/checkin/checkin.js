'use strict';

barMixControllers
  .config(function ($stateProvider) {
    $stateProvider
      .state('checkin', {
        url: '/checkin',
        templateUrl: 'templates/checkin.html',
        controller: 'CheckinCtrl'
      });
  });