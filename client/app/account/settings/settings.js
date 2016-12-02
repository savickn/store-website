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
        controller: 'AccountCtrl',
        authenticate: true
      })
      .state('settings.account.password', {
        url: '/password',
        templateUrl: 'app/account/settings/details/partials/password.html'
      })
      .state('settings.account.email', {
        url: '/email',
        templateUrl: 'app/account/settings/details/partials/email.html'
      })
      .state('settings.account.info', {
        url: '/info',
        templateUrl: 'app/account/settings/details/partials/info.html'
      })
      .state('settings.account.billing', {
        url: '/billing',
        templateUrl: 'app/account/settings/details/partials/billing.html'
      })
      .state('settings.account.shipping', {
        url: '/shipping',
        templateUrl: 'app/account/settings/details/partials/shipping.html'
      })
      

      .state('settings.wishlist', {
        url: '/wishlist',
        templateUrl: 'app/account/settings/wishlist/wishlist.html',
        controller: 'WishlistCtrl',
        authenticate: true
      })
      .state('settings.orderHistory', {
        url: '/orders',
        templateUrl: 'app/account/settings/orders/orderHistory.html',
        controller: 'HistoryCtrl',
        authenticate: true
      })
      .state('settings.rewards', {
        url: '/rewards',
        templateUrl: 'app/account/settings/rewards/rewards.html',
        controller: 'RewardsCtrl',
        authenticate: true
      })
      .state('settings.paymentOptions', {
        url: '/paymentOptions',
        templateUrl: 'app/account/settings/paymentOptions/options.html',
        controller: 'PaymentCtrl',
        authenticate: true
      });
  });