'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('wishlists', {
        url: '/wishlists',
        templateUrl: 'app/wishlists/index.html',
        controller: 'WishlistsCtrl'
      })
      .state('wishlists.show', {
        url: '/:id',
        templateUrl: 'app/wishlists/show.html',
        controller: 'WishlistCtrl',
        params: {
          wishlist: {}
        }
      })
  });