'use strict';

barmixApp
  .config(function ($stateProvider) {
    $stateProvider
      .state('meetLocation', {
        url: '/meetLocation',
        templateUrl: 'templates/meetLocation.html',
        controller: 'MeetlocationCtrl'
      });
  });