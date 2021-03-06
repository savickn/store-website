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
      .state('settings.account.info', {
        url: '/info',
        templateUrl: 'app/account/settings/details/partials/info.html'
      })
      .state('settings.account.address', {
        url: '/address',
        templateUrl: 'app/account/settings/details/partials/address.html',
        controller: 'AddressCtrl'
      })

      .state('settings.paymentOptions', {
        url: '/paymentOptions',
        templateUrl: 'app/account/settings/paymentOptions/index.html',
        controller: 'PaymentCtrl',
        authenticate: true
      })
      .state('settings.paymentOptions.new', {
        url: '/new',
        templateUrl: 'app/account/settings/paymentOptions/new.html',
        controller: 'PaymentCtrl',
        authenticate: true
      })

      .state('settings.myWishlist', {
        url: '/myWishlist',
        templateUrl: 'app/wishlist/show.html',
        controller: 'WishlistCtrl',
        params: {
          id: null
        },
        authenticate: true
      })
      .state('settings.orderHistory', {
        url: '/orderHistory',
        templateUrl: 'app/account/settings/orders/history.html',
        controller: 'HistoryCtrl',
        authenticate: true
      })
      .state('settings.rewards', {
        url: '/rewards',
        templateUrl: 'app/account/settings/rewards/rewards.html',
        controller: 'RewardsCtrl',
        authenticate: true
      });
  });
