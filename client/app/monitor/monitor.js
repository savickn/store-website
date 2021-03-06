
'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('products.monitors', {
        url: '/monitors?page&pagecount',
        templateUrl: 'app/product/index.html',
        controller: 'ProductCollectionCtrl',
        params: {
          page: {
            value: '1',
            squash: true
          },
          pagecount: {
            value: '10',
            squash: true
          },
          type: {
            value: 'Monitor'
          }
        }
      })
      .state('newMonitor', {
        url: '/monitors/new',
        templateUrl: 'app/monitor/new.html',
        controller: 'MonitorCtrl'
      })
      .state('showMonitor', {
      	url: '/monitors/:id',
      	templateUrl: 'app/monitor/show.html',
      	controller: 'MonitorCtrl'
      });
  });
