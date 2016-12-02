'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('wishlists', {
        url: '/wishlists',
        templateUrl: 'app/wishlists/home.html',
        controller: 'WishlistsCtrl'
      })
      .state('wishlists.index', {
        url: '/',
        templateUrl: 'app/wishlists/index.html'
      })
      .state('wishlists.show', {
        url: '/:id',
        templateUrl: 'app/components/wishlists/show.html',
        controller: 'WishlistCtrl'
      })
  });