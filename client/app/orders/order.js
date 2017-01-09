
'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('orders', {
        url: '/orders?page&pagecount',
        templateUrl: 'app/order/index.html',
        controller: 'OrderCollectionCtrl',
        params: {
          page: {
            value: '1',
            squash: true
          },
          pagecount: {
            value: '10',
            squash: true
          }
        }
      })
      .state('orders.show', {
        url: '/:id',
        templateUrl: 'app/order/show.html',
        controller: 'orderCtrl'
      })
      .state('newOrder', {
        url: '/orders/new',
        templateUrl: 'app/order/new.html',
        controller: 'OrderUploadCtrl',
        authenticate: true
      });
  });
