
'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('products.keyboards', {
        url: '/keyboards?page&pagecount',
        templateUrl: 'app/computer/index.html',
        controller: 'KeyboardCollectionCtrl',
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
  });
