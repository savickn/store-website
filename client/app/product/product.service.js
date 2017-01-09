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
      getProducts: function() {

      },
      searchProducts: function(category, searchObj) {
        return Restangular.all(category).customPOST(searchObj, 'search');
      }
    };
  });


