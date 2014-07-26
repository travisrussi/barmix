'use strict';

barmixApp
  .config(function ($stateProvider) {
    $stateProvider
      .state('meetList', {
        url: '/meetList',
        templateUrl: 'templates/meetList.html',
        controller: 'MeetlistCtrl'
      });
  });