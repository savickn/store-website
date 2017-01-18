'use strict';

angular.module('passportApp')
  .factory('WishlistService', function (Restangular) {
  	return {
      getWishlist: function(wishlistId) {
        return Restangular.one('wishlists', wishlistId).get();
      },
  		searchWishlists: function(query) {
  			return Restangular.all('wishlists').customGET('search', query);
  		},
  		updateWishlist: function(wishlistId, wishlist) {
  			return Restangular.one('wishlists', wishlistId).customPUT(wishlist);
  		}
  	};
  });




      /*addToWishlist: function(wishlistId, data) {
        return Restangular.one('wishlists', wishlistId).customPUT(data, 'add');
      },
      removeFromWishlist: function(wishlistId, data) {
        return Restangular.one('wishlists', wishlistId).customPUT(data, 'remove');  
      },*/





