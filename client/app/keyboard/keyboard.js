
'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('products.keyboards', {
        url: '/keyboards?page&pagecount',
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
            value: 'Keyboard'
          }
        }
      })
      .state('newKeyboard', {
        url: '/keyboards/new',
        templateUrl: 'app/keyboard/new.html',
        controller: 'KeyboardCtrl'
      })
  });
