
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
      .state('showOrder', {
        url: '/showOrder/:id',
        templateUrl: 'app/order/show.html',
        controller: 'OrderCtrl'
      })
      .state('newOrder', {
        url: '/newOrder',
        templateUrl: 'app/order/new.html',
        controller: 'OrderUploadCtrl',
        authenticate: true
      });
  });
