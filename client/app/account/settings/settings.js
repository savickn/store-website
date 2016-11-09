'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })


      .state('settings.account', {
        url: '/account',
        templateUrl: 'app/account/settings/details/account.html',
        controller: 'AccountCtrl'
      })
      /*.state('settings.account.password', {
        url: '/password',
        templateUrl: 'app/account/settings/details/password.html',
        controller: 'SettingsCtrl'
      })
      .state('settings.account.email', {
        url: '/email',
        templateUrl: 'app/account/settings/email.html',
        controller: 'SettingsCtrl'
      })
      .state('settings.account.info', {
        url: '/info',
        templateUrl: 'app/account/settings/info.html',
        controller: 'SettingsCtrl'
      })*/
      

      .state('settings.wishlist', {
        url: '/wishlist',
        templateUrl: 'app/account/settings/wishlist.html',
        controller: 'SettingsCtrl'
      })
      .state('settings.orderHistory', {
        url: '/orders',
        templateUrl: 'app/account/settings/orders/orderHistory.html',
        controller: 'SettingsCtrl'
      })
      .state('settings.rewards', {
        url: '/rewards',
        templateUrl: 'app/account/settings/rewards/rewards.html',
        controller: 'SettingsCtrl'
      })
      .state('settings.paymentOptions', {
        url: '/paymentOptions',
        templateUrl: 'app/account/settings/paymentOptions.html',
        controller: 'SettingsCtrl'
      });
  });