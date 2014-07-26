'use strict';

barmixApp
  .config(function ($stateProvider) {
    $stateProvider
      .state('meetStatus', {
        url: '/meetStatus',
        templateUrl: 'templates/meetStatus.html',
        controller: 'MeetstatusCtrl'
      });
  });