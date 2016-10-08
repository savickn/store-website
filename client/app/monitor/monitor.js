
'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('monitors', {
        url: '/monitors',
        templateUrl: 'app/monitor/index.html',
        controller: 'MonitorsCtrl'
      })
      .state('monitors/show', {
      	url: '/monitors/:id',
      	templateUrl: 'app/monitor/show.html',
      	controller: 'MonitorCtrl'
      });
  });