'use strict';

barmixApp
  .config(function ($stateProvider) {
    $stateProvider
      .state('setupCheckin', {
        url: '/setupCheckin',
        templateUrl: 'templates/setupCheckin.html',
        controller: 'SetupcheckinCtrl'
      });
  });