'use strict';

angular.module('passportApp')
  .controller('WishlistCtrl', function ($scope, $stateParams, WishlistService, Auth) {
    $scope.wishlist = {};
    console.log($stateParams);


    (function getWishlistProducts() {
        var name = $stateParams.wishlist.name;
        WishlistService.getWishlist($stateParams.wishlist._id).then(function(wishlist) {
            $scope.wishlist = wishlist;
            $scope.wishlist.name = name;
            $scope.isOwner = Auth.isOwner(wishlist.user._id);
            console.log($scope.wishlist);
        })
    }) ();

    /*$scope.removeFromWishlist = function(wishlistId, productId) {
    	WishlistService.removeFromWishlist(wishlistId, productId).then(function(success) {
    		console.log(success);
    	}).catch(function(err) {
    		console.log(err);
    	});
    };*/

    $scope.purchaseFromWishlist = function(wishlistId, productId) {
    	console.log('purchaseFromWishlist');
    };

  });
