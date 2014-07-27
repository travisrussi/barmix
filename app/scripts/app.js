'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
var barmixApp = angular.module('Barmix', ['ionic', 'Barmix.controllers'])

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'templates/main.html',
                controller: 'MainCtrl'
            })
            .state('test', {
                url: '/test',
                templateUrl: 'templates/test.html',
                controller: 'TestCtrl'
            });

        $urlRouterProvider.otherwise('/setupIntro');

    });





// For todays date;
Date.prototype.today = function () {
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}