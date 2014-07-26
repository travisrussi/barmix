'use strict';

barmixApp
  .config(function ($stateProvider) {
    $stateProvider
      .state('meetAccept', {
        url: '/meetAccept',
        templateUrl: 'templates/meetAccept.html',
        controller: 'MeetacceptCtrl'
      });
  });