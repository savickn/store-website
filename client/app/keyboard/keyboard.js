
'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('keyboards', {
        url: '/keyboards',
        templateUrl: 'app/keyboard/index.html',
        controller: 'KeyboardCtrl'
      });
  });