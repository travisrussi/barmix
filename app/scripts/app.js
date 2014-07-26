'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
var barmixApp = angular.module('Barmix', ['ionic', 'Barmix.controllers'])

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('intro', {
                url: '/',
                templateUrl: 'templates/intro.html',
                controller: 'IntroCtrl'
            })
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

        $urlRouterProvider.otherwise('/');

    });
