
'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('store', {
        url: '/store',
        templateUrl: 'app/store/store.html',
        controller: 'StoreCtrl'
      })
      .state('new', {
      	url: '/store/new',
      	templateUrl: 'app/store/new_product.html',
      	controller: 'StoreCtrl'
      })
      .state('new_computer', {
      	url: '/store/new_computer',
      	templateUrl: 'app/computer/new_computer.html',
      	controller: 'ComputerCtrl'
      });
  });