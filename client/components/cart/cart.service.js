'use strict';

angular.module('passportApp')
  .factory('CartService', function ($location, $rootScope, $http, $cookies, $q) {
    //should have quantity/price/__t/_id
    var shoppingCart = {};

    if($cookies.get('cart')) {
      shoppingCart = $cookies.get('cart');
    }

    return {

      addToCart: function(item) {
      	var deferred = $q.defer();

      	shoppingCart.push(item);
      },

      removeFromCart: function() {

      },

      checkoutItems: function() {

      }
    };
  });

