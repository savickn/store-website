'use strict';

angular.module('passportApp')
  .factory('WishlistService', function (Restangular) {
  	return {
  		searchWishlists: function(searchObj) {
  			return Restangular.all('wishlists').customGET('search', {name: searchObj.name, email: searchObj.email});
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





