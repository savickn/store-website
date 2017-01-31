
'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('products.keyboards', {
        url: '/keyboards',
        templateUrl: 'app/keyboard/index.html',
        controller: 'KeyboardCollectionCtrl'
      })
  });
