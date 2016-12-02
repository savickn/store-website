'use strict';

angular.module('passportApp')
  .controller('WishlistCtrl', function ($scope, WishlistService) {

    $scope.removeFromWishlist = function(wishlistId, productId) {
    	WishlistService.removeFromWishlist(wishlistId, productId).then(function(success) {
    		console.log(success);
    	}).catch(function(err) {
    		console.log(err);
    	});
    };

    $scope.purchaseFromWishlist = function(wishlistId, productId) {
    	console.log('purchaseFromWishlist');
    };

  });