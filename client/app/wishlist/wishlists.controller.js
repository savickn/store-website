'use strict';

angular.module('passportApp')
  .controller('WishlistsCtrl', function ($scope, $state, $filter, WishlistService, Auth) {
  	$scope.giftee = {};

  	$scope.searchWishlists = function(form, giftee) {
      if(form.$valid) {
        WishlistService.searchWishlists(giftee).then(function(wishlists) {
          $scope.wishlistQuery = wishlists;
          $scope.giftee = {};
          $state.transitionTo('wishlists');
        })
      }
  	};
  });
