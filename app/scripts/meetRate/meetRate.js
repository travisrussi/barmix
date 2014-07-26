'use strict';

barmixApp
  .config(function ($stateProvider) {
    $stateProvider
      .state('meetRate', {
        url: '/meetRate',
        templateUrl: 'templates/meetRate.html',
        controller: 'MeetrateCtrl'
      });
  });