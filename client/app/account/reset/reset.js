'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('forgotPassword', {
        url: '/forgotPassword',
        templateUrl: 'app/account/reset/forgotPassword.html',
        controller: 'ResetController'
      })
      .state('resetPassword', {
        url: '/resetPassword',
        templateUrl: 'app/account/reset/reset.html',
        controller: 'ResetController'
      });
  });
