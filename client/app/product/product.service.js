'use strict';

angular.module('passportApp')
  .factory('ProductService', function (Restangular) {

    var service = {
      getFeatured: function() {
        return Restangular.all('products').getList('featured'); 
      },
      addProduct: function(product) {
      	return Restangular.all('products').post(product);
      }
    };
    
    return service;
  });
