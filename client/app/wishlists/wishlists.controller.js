'use strict';

angular.module('passportApp')
  .controller('WishlistsCtrl', function ($scope, $state, WishlistService, Auth) {
  	$scope.giftee = {};

  	$scope.searchWishlists = function(giftee) {
  		//merge first + last name client-side then send to server

  		WishlistService.searchWishlists(giftee).then(function(wishlists) {
  			$scope.wishlistQuery = wishlists;
  			$state.transitionTo('wishlists.index', {name: giftee.name, email: giftee.email});
  		})	
  	};
  });

