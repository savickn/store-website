'use strict';

angular.module('passportApp')
  .factory('ProductService', function (Restangular) {
    return {
      getFeatured: function() {
        return Restangular.all('products').customGET('featured'); 
      },
      addProduct: function(product) {
      	return Restangular.all('products').post(product);
      },
      searchProducts: function(searchObj) {
        return Restangular.all('products').customGET('search', searchObj);
      },
      removeProduct: function(productId) {
        return Restangular.one('products', productId).remove();
      }
    };
  });


