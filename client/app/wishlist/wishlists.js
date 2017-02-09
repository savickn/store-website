'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('wishlists', {
        url: '/wishlists',
        templateUrl: 'app/wishlist/index.html',
        controller: 'WishlistsCtrl'
      })
      .state('showWishlist', {
        url: '/wishlists/:id',
        templateUrl: 'app/wishlist/show.html',
        controller: 'WishlistCtrl'
      })
  });
