
'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('activeSales', {
        url: '/activeSales',
        templateUrl: 'app/sale/index.html',
        controller: 'SaleCollectionCtrl'
      })
      .state('newSale', {
        url: '/createSale',
        templateUrl: 'app/sale/new.html',
        controller: 'SaleUploadCtrl'
      })
  });
