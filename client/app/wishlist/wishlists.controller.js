'use strict';

angular.module('passportApp')
  .controller('WishlistsCtrl', function ($scope, $state, WishlistService, Auth) {
  	$scope.giftee = {};

  	$scope.searchWishlists = function(form, giftee) {
  		//merge first + last name client-side then send to server

      if(form.$valid) {
        WishlistService.searchWishlists(giftee).then(function(wishlists) {
          $scope.wishlistQuery = wishlists;
          $scope.giftee = {};
          $state.transitionTo('wishlists');
        })
      }	
  	};
  });

