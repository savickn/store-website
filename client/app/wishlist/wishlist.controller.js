'use strict';

angular.module('passportApp')
  .controller('WishlistCtrl', function ($scope, $stateParams, WishlistService, Auth, ngCart, AlertService) {
    $scope.wishlist = {};
    $scope.isOwner = false;

    (function getWishlist() {
        WishlistService.getWishlist($stateParams.id).then(function(wishlist) {
            $scope.wishlist = wishlist;
            $scope.isOwner = Auth.isOwner(wishlist.user._id);
        })
    }) ();

    $scope.purchaseFromWishlist = function(wishlistId, product) {
    	console.log(wishlistId);
      console.log(product);

      var data = {
        giftee: wishlistId
      };
      ngCart.addItem(product._id, product.name, product.price, 1, data);
      AlertService.setAlert('This item has been added to your cart. Proceed to the checkout page to complete the purchase.', 'Success');
    };
  });
